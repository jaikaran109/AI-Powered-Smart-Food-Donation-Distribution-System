const FoodListing = require('../models/FoodListing');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { logActivity } = require('../utils/logger');

// @desc    Get all food listings with search, category, status, and geo filters
// @route   GET /api/listings
// @access  Public
exports.getListings = async (req, res, next) => {
  try {
    const {
      search,
      category,
      dietary,
      status,
      storageCondition,
      urgency,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 24,
    } = req.query;

    const query = {};

    // Filter by status (default to Available if not explicitly looking for all/specific)
    if (status && status !== 'all') {
      query.status = status;
    } else if (!status) {
      query.status = { $in: ['Available', 'Requested', 'Accepted'] };
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (dietary && dietary !== 'all') {
      query.dietaryType = dietary;
    }

    if (storageCondition && storageCondition !== 'all') {
      query.storageCondition = storageCondition;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { donorName: { $regex: search, $options: 'i' } },
        { donorOrg: { $regex: search, $options: 'i' } },
        { 'pickupAddress.city': { $regex: search, $options: 'i' } },
        { 'pickupAddress.street': { $regex: search, $options: 'i' } },
      ];
    }

    // Sort order
    let sortObj = {};
    if (sortBy === 'urgency') {
      sortObj = { urgencyScore: -1, expiryTime: 1 };
    } else if (sortBy === 'expiry') {
      sortObj = { expiryTime: 1 };
    } else if (sortBy === 'quantity') {
      sortObj = { quantity: order === 'asc' ? 1 : -1 };
    } else {
      sortObj = { [sortBy]: order === 'asc' ? 1 : -1 };
    }

    const total = await FoodListing.countDocuments(query);
    const listings = await FoodListing.find(query)
      .populate('donorId', 'name organizationName organizationType phone avatar isVerified rating')
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Dynamic AI risk evaluation
    const enrichedListings = listings.map((item) => {
      const risk = calculateSpoilageRisk(item);
      return {
        ...item.toObject(),
        aiRiskAnalysis: risk,
      };
    });

    res.status(200).json({
      success: true,
      count: enrichedListings.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      listings: enrichedListings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single food listing by ID
// @route   GET /api/listings/:id
// @access  Public
exports.getListingById = async (req, res, next) => {
  try {
    const listing = await FoodListing.findById(req.params.id)
      .populate('donorId', 'name organizationName organizationType phone email avatar isVerified metrics address location')
      .populate({
        path: 'activeClaimId',
        select: 'status receiverName receiverOrg receiverPhone estimatedPickupTime transportMode volunteerCount verificationOtp',
      });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Food listing not found',
      });
    }

    // Increment views
    listing.viewsCount = (listing.viewsCount || 0) + 1;
    await listing.save();

    const aiRiskAnalysis = calculateSpoilageRisk(listing);

    res.status(200).json({
      success: true,
      listing: {
        ...listing.toObject(),
        aiRiskAnalysis,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new food listing (Donor only)
// @route   POST /api/listings
// @access  Private (Donor, Admin)
exports.createListing = async (req, res, next) => {
  try {
    const {
      title,
      category,
      dietaryType,
      quantity,
      quantityUnit,
      cookedTime,
      expiryTime,
      storageCondition,
      allergens,
      description,
      images,
      pickupAddress,
      coordinates,
      contactPhone,
      specialInstructions,
    } = req.body;

    const user = req.user;

    // Coordinates fallback
    let locationData = { type: 'Point', coordinates: [77.2090, 28.6139] };
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 2) {
      locationData.coordinates = [Number(coordinates[0]), Number(coordinates[1])];
    } else if (user.location && user.location.coordinates) {
      locationData.coordinates = user.location.coordinates;
    }

    // Expiry fallback if not given: 6 hours from now
    const calculatedExpiry = expiryTime
      ? new Date(expiryTime)
      : new Date(Date.now() + 6 * 60 * 60 * 1000);

    const listing = new FoodListing({
      donorId: user._id,
      donorName: user.name,
      donorOrg: user.organizationName || `${user.name}'s Kitchen`,
      title,
      category: category || 'Cooked Meals',
      dietaryType: dietaryType || 'Vegetarian',
      quantity: Number(quantity),
      quantityUnit: quantityUnit || 'servings',
      cookedTime: cookedTime ? new Date(cookedTime) : new Date(),
      expiryTime: calculatedExpiry,
      storageCondition: storageCondition || 'Ambient (Room Temp)',
      allergens: allergens || [],
      description: description || '',
      images: images && images.length > 0
        ? images
        : ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'],
      pickupAddress: pickupAddress || user.address || {
        street: 'Main Donor Center',
        city: 'Metro City',
        state: 'Central',
        pincode: '100001',
      },
      location: locationData,
      contactPhone: contactPhone || user.phone || '+1 555-0199',
      specialInstructions: specialInstructions || '',
      status: 'Available',
    });

    listing.calculateUrgency();
    await listing.save();

    // Increment user's total donations count & kg
    const kgEstimated = listing.quantityUnit === 'kg' ? listing.quantity : (listing.quantity * 0.4);
    await User.findByIdAndUpdate(user._id, {
      $inc: {
        'metrics.totalDonationsCount': 1,
        'metrics.totalDonatedKg': Math.round(kgEstimated),
        'metrics.totalMealsSaved': listing.estimatedMeals || listing.quantity,
      },
    });

    // Notify registered NGOs about new donation available
    const activeNgos = await User.find({ role: 'receiver', isActive: true }).limit(5);
    for (const ngo of activeNgos) {
      await Notification.create({
        recipientId: ngo._id,
        senderId: user._id,
        title: '🍲 Fresh Surplus Food Available!',
        message: `${user.organizationName || user.name} listed ${listing.quantity} ${listing.quantityUnit} of ${listing.title}. Claim before expiry!`,
        type: 'NEW_LISTING_NEARBY',
        link: `/listings/${listing._id}`,
        relatedListingId: listing._id,
      });
    }

    await logActivity({
      userId: user._id,
      userName: user.name,
      userRole: user.role,
      action: 'LISTING_CREATED',
      description: `Donor ${user.name} created food donation: "${listing.title}" (${listing.quantity} ${listing.quantityUnit})`,
      entityType: 'FoodListing',
      entityId: listing._id,
    });

    res.status(201).json({
      success: true,
      message: 'Surplus food listing created successfully',
      listing,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update food listing
// @route   PUT /api/listings/:id
// @access  Private (Donor Owner, Admin)
exports.updateListing = async (req, res, next) => {
  try {
    let listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    // Ensure donor owns listing or is admin
    if (listing.donorId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this listing',
      });
    }

    listing = await FoodListing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    await logActivity({
      userId: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: 'LISTING_UPDATED',
      description: `Listing "${listing.title}" updated by ${req.user.name}`,
      entityType: 'FoodListing',
      entityId: listing._id,
    });

    res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      listing,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete food listing
// @route   DELETE /api/listings/:id
// @access  Private (Donor Owner, Admin)
exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    if (listing.donorId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this listing',
      });
    }

    await FoodListing.findByIdAndDelete(req.params.id);

    await logActivity({
      userId: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: 'LISTING_DELETED',
      description: `Listing "${listing.title}" removed from platform`,
      entityType: 'FoodListing',
      entityId: listing._id,
    });

    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's donations (Donor Dashboard)
// @route   GET /api/listings/my-donations
// @access  Private (Donor)
exports.getMyDonations = async (req, res, next) => {
  try {
    const listings = await FoodListing.find({ donorId: req.user.id })
      .populate('activeClaimId')
      .populate('claimedBy', 'name organizationName phone email avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    next(error);
  }
};
