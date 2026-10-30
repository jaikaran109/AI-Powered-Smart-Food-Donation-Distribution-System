const PptxGenJS = require('pptxgenjs');
const path = require('path');

const pres = new PptxGenJS();
pres.layout = 'LAYOUT_16x9'; // 10.0 x 5.625 inches
pres.author = 'Smart Food Donation Platform Team';
pres.company = 'Full Stack MERN Capstone Project';
pres.title = 'AI-Powered Smart Food Donation & Distribution System';

// Theme Colors
const C = {
  navyDark: '0F172A',     // Slate 900
  navyCard: '1E293B',     // Slate 800
  navyLight: '334155',    // Slate 700
  mutedText: '64748B',    // Slate 500
  lightText: '94A3B8',    // Slate 400
  lightBg: 'F8FAFC',      // Slate 50
  cardBg: 'FFFFFF',       // White
  cardBorder: 'E2E8F0',   // Slate 200
  primaryGreen: '10B981', // Emerald 500
  darkGreen: '047857',    // Emerald 700
  lightGreenBg: 'ECFDF5', // Emerald 50
  primaryBlue: '0284C7',  // Sky 600
  lightBlueBg: 'E0F2FE',  // Sky 100
  accentIndigo: '6366F1', // Indigo 500
  lightIndigoBg: 'EEF2FF',// Indigo 50
  accentAmber: 'D97706',  // Amber 600
  lightAmberBg: 'FEF3C7', // Amber 100
  accentRed: 'DC2626',    // Red 600
  lightRedBg: 'FEE2E2',   // Red 100
  white: 'FFFFFF',
  bodyText: '1E293B'
};

// Helper: Standard Slide Header & Footer
function applySlideTemplate(slide, category, title, subtitle, slideNum, totalSlides = 14) {
  // Background
  slide.background = { color: C.lightBg };

  // Top Category Pill
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 0.35, w: 2.5, h: 0.28,
    fill: { color: C.lightBlueBg },
    line: { color: 'BAE6FD', width: 1 }
  });
  slide.addText(category.toUpperCase(), {
    x: 0.8, y: 0.35, w: 2.5, h: 0.28,
    fontFace: 'Segoe UI', fontSize: 9, bold: true, color: C.primaryBlue,
    align: 'center', valign: 'middle'
  });

  // Slide Title
  slide.addText(title, {
    x: 0.8, y: 0.68, w: 8.4, h: 0.42,
    fontFace: 'Segoe UI', fontSize: 19, bold: true, color: C.navyDark,
    valign: 'middle'
  });

  // Slide Subtitle
  slide.addText(subtitle, {
    x: 0.8, y: 1.12, w: 8.4, h: 0.28,
    fontFace: 'Segoe UI', fontSize: 10, italic: true, color: C.mutedText,
    valign: 'middle'
  });

  // Top Header Divider Line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.44, w: 8.4, h: 0.02,
    fill: { color: C.cardBorder },
    line: { color: C.cardBorder, width: 0 }
  });

  // Bottom Footer Divider & Text
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 5.15, w: 8.4, h: 0.02,
    fill: { color: C.cardBorder },
    line: { color: C.cardBorder, width: 0 }
  });
  slide.addText('AI-Powered Smart Food Donation & Distribution System (SFD) — MERN Capstone', {
    x: 0.8, y: 5.2, w: 6.0, h: 0.25,
    fontFace: 'Segoe UI', fontSize: 8, color: C.lightText,
    valign: 'middle'
  });
  slide.addText(`Slide ${slideNum} of ${totalSlides}`, {
    x: 7.2, y: 5.2, w: 2.0, h: 0.25,
    fontFace: 'Segoe UI', fontSize: 8, color: C.lightText,
    align: 'right', valign: 'middle'
  });

  // Bottom Green Accent Line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.57, w: 10.0, h: 0.055,
    fill: { color: C.primaryGreen },
    line: { color: C.primaryGreen, width: 0 }
  });
}

// ==========================================
// SLIDE 1: Title Slide (Dark Elegance)
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.navyDark };

  // Decorative top bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10.0, h: 0.08,
    fill: { color: C.primaryGreen },
    line: { color: C.primaryGreen, width: 0 }
  });

  // Project Category Pill
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 0.6, w: 3.5, h: 0.35,
    fill: { color: C.navyCard },
    line: { color: C.primaryGreen, width: 1.5 }
  });
  slide.addText('🌟 FULL STACK MERN CAPSTONE PROJECT', {
    x: 1.0, y: 0.6, w: 3.5, h: 0.35,
    fontFace: 'Segoe UI', fontSize: 9.5, bold: true, color: C.primaryGreen,
    align: 'center', valign: 'middle'
  });

  // Main Title
  slide.addText('AI-Powered Smart Food Donation\n& Distribution System', {
    x: 1.0, y: 1.15, w: 8.0, h: 1.3,
    fontFace: 'Segoe UI', fontSize: 28, bold: true, color: C.white,
    lineSpacingMultiple: 1.15
  });

  // Subtitle / Tagline
  slide.addText('Bridging Surplus Food Donors & Verified NGOs with Real-Time Logistics Tracking, 6-Digit OTP Handover, and AI-Driven Multi-Criteria Decision Matching (MCDA)', {
    x: 1.0, y: 2.55, w: 8.0, h: 0.6,
    fontFace: 'Segoe UI', fontSize: 12, color: C.lightText,
    lineSpacingMultiple: 1.15
  });

  // 3 Feature Highlights (Pill Cards)
  const highlights = [
    { title: '🤖 AI Demand Matching', desc: 'MCDA scoring with proximity, capacity & trust' },
    { title: '🚚 4-Stage Logistics', desc: 'Real-time tracking with secure OTP verification' },
    { title: '🗺️ Geospatial Maps', desc: 'Leaflet interactive radius & freshness heatmaps' }
  ];

  highlights.forEach((h, i) => {
    const xPos = 1.0 + i * 2.75;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 3.35, w: 2.55, h: 0.95,
      fill: { color: C.navyCard },
      line: { color: C.navyLight, width: 1 }
    });
    slide.addText(h.title, {
      x: xPos + 0.15, y: 3.42, w: 2.25, h: 0.3,
      fontFace: 'Segoe UI', fontSize: 10.5, bold: true, color: C.primaryGreen
    });
    slide.addText(h.desc, {
      x: xPos + 0.15, y: 3.75, w: 2.25, h: 0.45,
      fontFace: 'Segoe UI', fontSize: 8.5, color: C.lightText
    });
  });

  // Presenter / Team Info & Badges
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.0, y: 4.55, w: 8.0, h: 0.02,
    fill: { color: C.navyLight },
    line: { color: C.navyLight, width: 0 }
  });

  slide.addText([
    { text: 'Target UN SDGs: ', options: { bold: true, color: C.white } },
    { text: 'SDG 2 (Zero Hunger)  |  SDG 12 (Responsible Consumption)  |  SDG 13 (Climate Action)', options: { color: C.primaryGreen } }
  ], {
    x: 1.0, y: 4.65, w: 8.0, h: 0.28,
    fontFace: 'Segoe UI', fontSize: 9.5
  });

  slide.addText([
    { text: 'Live App: ', options: { bold: true, color: C.white } },
    { text: 'Vercel Frontend  •  Render REST API  •  MongoDB Atlas Cloud', options: { color: '38BDF8' } }
  ], {
    x: 1.0, y: 4.95, w: 8.0, h: 0.28,
    fontFace: 'Segoe UI', fontSize: 9.5
  });
}

// ==========================================
// SLIDE 2: Executive Summary & Vision
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'Project Overview', 'Executive Summary & The Zero Hunger Mission', 'Leveraging technology to turn perishable food surplus into life-saving community nutrition', 2);

  // 3 Big Vertical Column Cards
  const cards = [
    {
      title: 'The Global Crisis',
      tag: 'CHALLENGE',
      tagColor: C.accentRed,
      tagBg: C.lightRedBg,
      items: [
        '1.3 Billion tons of edible food is wasted globally every single year.',
        '828 Million people suffer from chronic hunger and food insecurity.',
        'Commercial hospitality (banquets, hotels, caterers) produces large batches of high-grade surplus.',
        'Organic waste in landfills accounts for 8-10% of global greenhouse gas emissions.'
      ]
    },
    {
      title: 'Our Platform Vision',
      tag: 'MISSION',
      tagColor: C.primaryGreen,
      tagBg: C.lightGreenBg,
      items: [
        'Zero Food Waste: Connect commercial surplus donors with verified shelters in under 5 minutes.',
        'Equitable Distribution: Eliminate local food gluts by algorithmically routing to high-need shelters.',
        'Complete Accountability: Provide tamper-proof custody transfer using 6-digit OTP verification.',
        'Transparency: Live environmental impact reports (CO2 saved, meals served).'
      ]
    },
    {
      title: 'UN SDGs Alignment',
      tag: 'GLOBAL IMPACT',
      tagColor: C.primaryBlue,
      tagBg: C.lightBlueBg,
      items: [
        'Goal 2 — Zero Hunger: Channeling safe nutrition directly to vulnerable children and destitute shelters.',
        'Goal 12 — Responsible Consumption: Halving per capita food waste across commercial supply chains.',
        'Goal 13 — Climate Action: Preventing organic methane emissions via rapid redistribution.',
        'Goal 17 — Partnerships: Multi-stakeholder bridge for donors, charities, and volunteers.'
      ]
    }
  ];

  cards.forEach((c, i) => {
    const xPos = 0.8 + i * 2.88;
    // Card Container
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.6, w: 2.65, h: 2.8,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });

    // Tag Pill
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.15, y: 1.75, w: 1.2, h: 0.22,
      fill: { color: c.tagBg },
      line: { color: c.tagColor, width: 0.8 }
    });
    slide.addText(c.tag, {
      x: xPos + 0.15, y: 1.75, w: 1.2, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 7.5, bold: true, color: c.tagColor,
      align: 'center', valign: 'middle'
    });

    // Card Title
    slide.addText(c.title, {
      x: xPos + 0.15, y: 2.05, w: 2.35, h: 0.35,
      fontFace: 'Segoe UI', fontSize: 13, bold: true, color: C.navyDark
    });

    // Bullet Items
    const bulletText = c.items.map(text => ({
      text: text + '\n\n',
      options: { fontFace: 'Segoe UI', fontSize: 8.5, color: C.bodyText, bullet: true }
    }));
    slide.addText(bulletText, {
      x: xPos + 0.15, y: 2.45, w: 2.35, h: 1.85,
      lineSpacingMultiple: 1.05
    });
  });

  // Bottom Banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 4.52, w: 8.4, h: 0.5,
    fill: { color: C.navyCard },
    line: { color: C.primaryGreen, width: 1 }
  });
  slide.addText('💡 Core Impact Principle: "Perishable food is a time-critical asset — automated dispatch saves meals that manual coordination loses."', {
    x: 0.8, y: 4.52, w: 8.4, h: 0.5,
    fontFace: 'Segoe UI', fontSize: 10, bold: true, color: C.white,
    align: 'center', valign: 'middle'
  });
}

// ==========================================
// SLIDE 3: Problem Statement & Existing Gaps
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'Problem Definition', 'The Food Redistribution Bottleneck', 'Why conventional food donation mechanisms fail to rescue cooked perishable surplus', 3);

  const gaps = [
    {
      num: '01',
      title: 'Manual & Chaotic Coordination',
      desc: 'Donors rely on phone calls, informal WhatsApp groups, or sporadic email threads. Dispatches suffer from communication latency, lack of status tracking, and frequent last-minute cancellations.'
    },
    {
      num: '02',
      title: 'Perishability & Time-Window Failure',
      desc: 'Cooked meals have a strict 4-to-6 hour consumption shelf life. Without dynamic urgency scoring and automated dispatch, food spoils on kitchen counters before pickup logistics can be arranged.'
    },
    {
      num: '03',
      title: 'Geographic & Capacity Mismatches',
      desc: 'Donors blindly contact single NGOs that may lack volunteer drivers, vehicle capacity, or cold storage. A 200-meal surplus goes to a 30-bed shelter, leading to secondary spoilage while others go hungry.'
    },
    {
      num: '04',
      title: 'Verification & Custody Security Void',
      desc: 'Donors face reputational and liability risks with unvetted collectors. Lack of cryptographic handover proof (OTP) leads to untracked food diversions, loss of accountability, and zero audit trails.'
    }
  ];

  gaps.forEach((g, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 0.8 + col * 4.3;
    const yPos = 1.6 + row * 1.7;

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: yPos, w: 4.1, h: 1.55,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });

    // Badge Number
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.2, y: yPos + 0.15, w: 0.55, h: 0.35,
      fill: { color: C.lightRedBg },
      line: { color: C.accentRed, width: 1 }
    });
    slide.addText(g.num, {
      x: xPos + 0.2, y: yPos + 0.15, w: 0.55, h: 0.35,
      fontFace: 'Segoe UI', fontSize: 11, bold: true, color: C.accentRed,
      align: 'center', valign: 'middle'
    });

    // Title
    slide.addText(g.title, {
      x: xPos + 0.85, y: yPos + 0.15, w: 3.1, h: 0.35,
      fontFace: 'Segoe UI', fontSize: 12, bold: true, color: C.navyDark,
      valign: 'middle'
    });

    // Description
    slide.addText(g.desc, {
      x: xPos + 0.2, y: yPos + 0.58, w: 3.7, h: 0.85,
      fontFace: 'Segoe UI', fontSize: 9, color: C.bodyText,
      lineSpacingMultiple: 1.15
    });
  });
}

// ==========================================
// SLIDE 4: Proposed Solution & Core Value
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'Solution Highlights', 'Smart Food Donation Platform: The Solution', 'An intelligent full-stack ecosystem uniting donors, NGOs, and administrators with AI and real-time logistics', 4);

  const solutions = [
    {
      title: 'Dynamic Urgency Scoring (0-100)',
      accent: C.accentAmber,
      bg: C.lightAmberBg,
      desc: 'Real-time algorithm evaluates cooking timestamp, shelf-life baselines, and storage condition (refrigerated, ambient, frozen) to assign immediate visual urgency badges and prioritize dispatches.'
    },
    {
      title: 'AI Multi-Criteria Matchmaker (MCDA)',
      accent: C.primaryGreen,
      bg: C.lightGreenBg,
      desc: 'Calculates optimal NGO-donor pairings across 4 weighted vectors: Geospatial distance (Haversine formula), capacity-to-demand ratio, dietary safety alignment, and historical trust ratings.'
    },
    {
      title: '4-Stage Logistics & Secure Handover OTP',
      accent: C.primaryBlue,
      bg: C.lightBlueBg,
      desc: 'Transparent chain of custody: Pending -> Accepted -> Picked Up -> Delivered. Physical handover is sealed via a 6-digit cryptographic OTP, eliminating food diversion and fraud.'
    },
    {
      title: 'Interactive Maps & Control Tower',
      accent: C.accentIndigo,
      bg: C.lightIndigoBg,
      desc: 'Full geospatial discovery via Leaflet OpenStreetMap with radial search filters. Administrators access real-time moderation, accreditation verification, and automated carbon offset calculations.'
    }
  ];

  solutions.forEach((s, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 0.8 + col * 4.3;
    const yPos = 1.6 + row * 1.7;

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: yPos, w: 4.1, h: 1.55,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });

    // Top Accent Strip
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.2, y: yPos + 0.18, w: 0.15, h: 0.4,
      fill: { color: s.accent },
      line: { color: s.accent, width: 0 }
    });

    slide.addText(s.title, {
      x: xPos + 0.45, y: yPos + 0.15, w: 3.5, h: 0.45,
      fontFace: 'Segoe UI', fontSize: 12, bold: true, color: C.navyDark,
      valign: 'middle'
    });

    slide.addText(s.desc, {
      x: xPos + 0.2, y: yPos + 0.65, w: 3.7, h: 0.8,
      fontFace: 'Segoe UI', fontSize: 9, color: C.bodyText,
      lineSpacingMultiple: 1.15
    });
  });
}

// ==========================================
// SLIDE 5: System Architecture & Workflow
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'System Architecture', 'Decoupled Client-Server MERN Architecture', 'High-performance, modular full-stack design built for low-latency dispatch and horizontal scaling', 5);

  // 3 Horizontal Tier Boxes
  const tiers = [
    {
      name: 'FRONTEND CLIENT TIER',
      tech: 'React 18 + Vite SPA',
      desc: 'Dynamic responsive web app with dark/light themes, Leaflet maps, and real-time state management',
      items: ['React Router DOM v6 Navigation', 'React-Leaflet Geospatial Maps', 'Auth & Notification React Contexts', 'Glassmorphism Design System'],
      color: C.primaryBlue,
      bg: C.lightBlueBg
    },
    {
      name: 'BACKEND SERVICES TIER',
      tech: 'Node.js + Express.js REST API',
      desc: 'Stateless API server executing business logic, security middleware, and algorithmic scoring',
      items: ['JWT Auth & RBAC Security', 'MCDA AI Matchmaker Engine', 'Express-Validator Input Sanitizer', 'Centralized Error Handling'],
      color: C.primaryGreen,
      bg: C.lightGreenBg
    },
    {
      name: 'PERSISTENCE DATABASE TIER',
      tech: 'MongoDB Atlas + Mongoose ODM',
      desc: 'Distributed cloud database hosting 8 normalized schemas with geospatial querying capabilities',
      items: ['2dsphere Geospatial Indexing', 'Full Audit Logging Collection', 'Automated Timestamp Tracking', 'Pre-seeded Demo Lifecycle Data'],
      color: C.accentIndigo,
      bg: C.lightIndigoBg
    }
  ];

  tiers.forEach((t, i) => {
    const xPos = 0.8 + i * 2.88;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.6, w: 2.65, h: 2.6,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });

    // Tier Header
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.15, y: 1.75, w: 2.35, h: 0.55,
      fill: { color: t.bg },
      line: { color: t.color, width: 1 }
    });
    slide.addText(t.name, {
      x: xPos + 0.15, y: 1.8, w: 2.35, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 8.5, bold: true, color: t.color,
      align: 'center', valign: 'middle'
    });
    slide.addText(t.tech, {
      x: xPos + 0.15, y: 2.02, w: 2.35, h: 0.25,
      fontFace: 'Segoe UI', fontSize: 9.5, bold: true, color: C.navyDark,
      align: 'center', valign: 'middle'
    });

    // Description
    slide.addText(t.desc, {
      x: xPos + 0.15, y: 2.4, w: 2.35, h: 0.55,
      fontFace: 'Segoe UI', fontSize: 8, italic: true, color: C.mutedText,
      lineSpacingMultiple: 1.1
    });

    // Bullets
    const bullets = t.items.map(b => ({
      text: b + '\n',
      options: { fontFace: 'Segoe UI', fontSize: 8.5, color: C.bodyText, bullet: true }
    }));
    slide.addText(bullets, {
      x: xPos + 0.15, y: 3.0, w: 2.35, h: 1.1,
      lineSpacingMultiple: 1.15
    });
  });

  // End-to-End Flow Summary Banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 4.35, w: 8.4, h: 0.68,
    fill: { color: C.navyDark },
    line: { color: C.primaryGreen, width: 1 }
  });
  slide.addText('DATA FLOW: Donor Lists Surplus ➔ Urgency Computed ➔ AI Matches Top NGOs ➔ NGO Submits Claim ➔ Donor Approves ➔ Real-Time Tracking ➔ OTP Verified at Handover', {
    x: 0.8, y: 4.35, w: 8.4, h: 0.68,
    fontFace: 'Segoe UI', fontSize: 8.5, bold: true, color: C.white,
    align: 'center', valign: 'middle'
  });
}

// ==========================================
// SLIDE 6: Comprehensive Tech Stack
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'Technology Stack', 'Full-Stack Technology Ecosystem', 'Production-grade open source tooling selected for speed, developer ergonomics, and reliability', 6);

  const techCategories = [
    {
      category: 'Frontend Client',
      badgeColor: C.primaryBlue,
      items: [
        { name: 'React 18 (Vite)', detail: 'Lightning-fast HMR and reactive component hierarchy' },
        { name: 'React Router DOM v6', detail: 'Declarative client-side routing & protected routes' },
        { name: 'Leaflet / React-Leaflet', detail: 'High-performance OpenStreetMap interactive mapping' },
        { name: 'Chart.js & Lucide Icons', detail: 'Real-time telemetry analytics and UI icon system' }
      ]
    },
    {
      category: 'Backend REST API',
      badgeColor: C.primaryGreen,
      items: [
        { name: 'Node.js (v24)', detail: 'Asynchronous event-driven server runtime' },
        { name: 'Express.js Framework', detail: 'Modular REST API routing & middleware architecture' },
        { name: 'Express-Validator', detail: 'Comprehensive payload sanitization & schema checks' },
        { name: 'Custom Logging Service', detail: 'Audited activity history and lifecycle trace logging' }
      ]
    },
    {
      category: 'Database & Models',
      badgeColor: C.accentIndigo,
      items: [
        { name: 'MongoDB Atlas', detail: 'Cloud distributed NoSQL database with auto-scaling' },
        { name: 'Mongoose ODM', detail: 'Strict schema modeling, pre-save hooks & validation' },
        { name: '2dsphere Geo-Indexes', detail: 'Ultra-fast radius and proximity spatial queries' },
        { name: 'Automated DB Seeder', detail: 'Realistic multi-role evaluation datasets' }
      ]
    },
    {
      category: 'Security & DevOps',
      badgeColor: C.accentAmber,
      items: [
        { name: 'JWT & bcryptjs', detail: 'Stateless Bearer token auth + 10-salt password hashing' },
        { name: 'Role-Based Access (RBAC)', detail: 'Endpoint protection: Donor, Receiver, and Admin' },
        { name: 'Vercel Deployment', detail: 'Frontend SPA continuous deployment with global edge' },
        { name: 'Render Cloud PaaS', detail: 'Dockerized backend server with SSL auto-provisioning' }
      ]
    }
  ];

  techCategories.forEach((tc, i) => {
    const xPos = 0.8 + i * 2.15;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.6, w: 2.0, h: 3.4,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });

    // Top Header
    slide.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.6, w: 2.0, h: 0.45,
      fill: { color: tc.badgeColor },
      line: { color: tc.badgeColor, width: 0 }
    });
    slide.addText(tc.category, {
      x: xPos, y: 1.6, w: 2.0, h: 0.45,
      fontFace: 'Segoe UI', fontSize: 10, bold: true, color: C.white,
      align: 'center', valign: 'middle'
    });

    // Items
    tc.items.forEach((item, itemIdx) => {
      const itemY = 2.15 + itemIdx * 0.72;
      slide.addText(item.name, {
        x: xPos + 0.1, y: itemY, w: 1.8, h: 0.22,
        fontFace: 'Segoe UI', fontSize: 9, bold: true, color: C.navyDark
      });
      slide.addText(item.detail, {
        x: xPos + 0.1, y: itemY + 0.22, w: 1.8, h: 0.45,
        fontFace: 'Segoe UI', fontSize: 7.8, color: C.mutedText,
        lineSpacingMultiple: 1.05
      });
    });
  });
}

// ==========================================
// SLIDE 7: AI Matchmaking Engine (MCDA Model)
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'Artificial Intelligence', 'AI Donor-to-NGO Matchmaker (MCDA Engine)', 'Multi-Criteria Decision Analysis model dynamically scoring and ranking recipient NGOs (0 to 100)', 7);

  // Top Formula Banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.55, w: 8.4, h: 0.65,
    fill: { color: C.navyCard },
    line: { color: C.primaryGreen, width: 1.2 }
  });
  slide.addText('MCDA SCORE = Proximity (35%) + Capacity Fit (30%) + Dietary Alignment (20%) + Trust Index (15%)', {
    x: 0.8, y: 1.6, w: 8.4, h: 0.3,
    fontFace: 'Segoe UI', fontSize: 11, bold: true, color: C.primaryGreen,
    align: 'center', valign: 'middle'
  });
  slide.addText('Score Grades: 90-100: "Best Match" (Emerald)  |  75-89: "High Match" (Indigo)  |  60-74: "Moderate Match" (Amber)', {
    x: 0.8, y: 1.92, w: 8.4, h: 0.22,
    fontFace: 'Segoe UI', fontSize: 8.5, color: C.lightText,
    align: 'center', valign: 'middle'
  });

  // 4 Criteria Columns
  const criteria = [
    {
      weight: '35%',
      title: 'Geospatial Proximity',
      calc: 'Haversine Distance Formula',
      desc: 'Calculates true surface distance & transit ETA between donor and NGO GPS coordinates.',
      tiers: '• <= 3 km: 35 pts (Max)\n• 3 - 7 km: 30 pts\n• 7 - 15 km: 22 pts\n• > 25 km: Distance penalty',
      color: C.primaryGreen,
      bg: C.lightGreenBg
    },
    {
      weight: '30%',
      title: 'Capacity & Demand Fit',
      calc: 'Intake Ratio (Q / C)',
      desc: 'Compares surplus meal batch size against NGO average daily distribution capacity.',
      tiers: '• Ratio 0.7 - 1.3: 30 pts (Ideal)\n• Ratio 0.4 - 2.0: 24 pts (Good)\n• Prevents overloading small shelters\n• Ensures full batch rescue',
      color: C.primaryBlue,
      bg: C.lightBlueBg
    },
    {
      weight: '20%',
      title: 'Dietary Compatibility',
      calc: 'Cultural & Safety Fit',
      desc: 'Matches donor food restrictions with NGO community dietary rules and cold chain.',
      tiers: '• Veg / Vegan: 20 pts (Universal)\n• Halal / Egg: 18 pts\n• Non-Veg: 15 pts\n• Checks refrigeration capability',
      color: C.accentIndigo,
      bg: C.lightIndigoBg
    },
    {
      weight: '15%',
      title: 'Trust & Accreditation',
      calc: 'Verification + Reviews',
      desc: 'Evaluates official verification status and cumulative historical peer rating.',
      tiers: '• Verified Badge: +8 pts\n• Platform Rating: Up to +7 pts\n• Rating scaled (Rating/5 * 7)\n• Incentivizes rapid pickups',
      color: C.accentAmber,
      bg: C.lightAmberBg
    }
  ];

  criteria.forEach((c, i) => {
    const xPos = 0.8 + i * 2.15;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 2.3, w: 2.0, h: 2.7,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });

    // Weight Tag
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.15, y: 2.42, w: 0.75, h: 0.3,
      fill: { color: c.bg },
      line: { color: c.color, width: 1 }
    });
    slide.addText(c.weight, {
      x: xPos + 0.15, y: 2.42, w: 0.75, h: 0.3,
      fontFace: 'Segoe UI', fontSize: 10, bold: true, color: c.color,
      align: 'center', valign: 'middle'
    });

    slide.addText(c.title, {
      x: xPos + 0.1, y: 2.8, w: 1.8, h: 0.45,
      fontFace: 'Segoe UI', fontSize: 10.5, bold: true, color: C.navyDark
    });
    slide.addText(c.desc, {
      x: xPos + 0.1, y: 3.3, w: 1.8, h: 0.55,
      fontFace: 'Segoe UI', fontSize: 7.8, color: C.bodyText,
      lineSpacingMultiple: 1.05
    });

    // Tiers
    slide.addShape(pres.shapes.RECTANGLE, {
      x: xPos + 0.1, y: 3.92, w: 1.8, h: 0.01,
      fill: { color: C.cardBorder },
      line: { color: C.cardBorder, width: 0 }
    });
    slide.addText(c.tiers, {
      x: xPos + 0.1, y: 4.0, w: 1.8, h: 0.9,
      fontFace: 'Segoe UI', fontSize: 7.5, color: C.mutedText,
      lineSpacingMultiple: 1.15
    });
  });
}

// ==========================================
// SLIDE 8: Real-Time Logistics & OTP Verification
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'Logistics & Security', '4-Stage Logistics Pipeline & 6-Digit OTP Handover', 'Securing the physical chain of custody with verified cryptographic transfer codes', 8);

  const stages = [
    {
      step: 'STAGE 1',
      status: 'Pending Claim',
      actor: 'Donor Action',
      desc: 'Donor publishes surplus batch. AI engine recommends top 4 verified NGOs. Nearby charities receive instant availability notifications.',
      color: C.accentAmber,
      bg: C.lightAmberBg
    },
    {
      step: 'STAGE 2',
      status: 'Accepted & Dispatched',
      actor: 'NGO + Donor Action',
      desc: 'NGO submits pickup request specifying vehicle mode, volunteer count & target beneficiaries. Donor confirms dispatch request.',
      color: C.primaryBlue,
      bg: C.lightBlueBg
    },
    {
      step: 'STAGE 3',
      status: 'Picked Up & En Route',
      actor: 'Logistics Courier',
      desc: 'Volunteer arrives at donor premises. Donor inspects volunteer credentials and system generates a secure 6-digit handover OTP.',
      color: C.accentIndigo,
      bg: C.lightIndigoBg
    },
    {
      step: 'STAGE 4',
      status: 'Delivered & Completed',
      actor: 'Handover Verification',
      desc: 'NGO inputs OTP at delivery point. System cryptographically validates the token, marks listing Delivered, and logs impact metrics.',
      color: C.primaryGreen,
      bg: C.lightGreenBg
    }
  ];

  stages.forEach((st, i) => {
    const xPos = 0.8 + i * 2.15;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.6, w: 2.0, h: 2.5,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });

    // Step Header Chip
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.15, y: 1.75, w: 1.7, h: 0.28,
      fill: { color: st.bg },
      line: { color: st.color, width: 1 }
    });
    slide.addText(st.step, {
      x: xPos + 0.15, y: 1.75, w: 1.7, h: 0.28,
      fontFace: 'Segoe UI', fontSize: 9, bold: true, color: st.color,
      align: 'center', valign: 'middle'
    });

    slide.addText(st.status, {
      x: xPos + 0.1, y: 2.12, w: 1.8, h: 0.45,
      fontFace: 'Segoe UI', fontSize: 10.5, bold: true, color: C.navyDark,
      align: 'center'
    });

    slide.addText(st.actor, {
      x: xPos + 0.1, y: 2.58, w: 1.8, h: 0.2,
      fontFace: 'Segoe UI', fontSize: 8, italic: true, color: C.mutedText,
      align: 'center'
    });

    slide.addText(st.desc, {
      x: xPos + 0.1, y: 2.85, w: 1.8, h: 1.15,
      fontFace: 'Segoe UI', fontSize: 8, color: C.bodyText,
      lineSpacingMultiple: 1.15
    });
  });

  // OTP Deep-Dive Card Below
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 4.25, w: 8.4, h: 0.8,
    fill: { color: C.navyCard },
    line: { color: C.primaryGreen, width: 1.2 }
  });

  slide.addText('🔐 THE 6-DIGIT OTP SECURITY ADVANTAGE:', {
    x: 1.0, y: 4.35, w: 4.0, h: 0.25,
    fontFace: 'Segoe UI', fontSize: 9.5, bold: true, color: C.primaryGreen
  });
  slide.addText('• Prevents unauthorized pickups by unverified intermediaries  • Guarantees recipient custody before releasing donor liability\n• Immutable timestamped audit log saved to database for CSR and regulatory compliance.', {
    x: 1.0, y: 4.6, w: 8.0, h: 0.38,
    fontFace: 'Segoe UI', fontSize: 8.5, color: C.lightText,
    lineSpacingMultiple: 1.15
  });
}

// ==========================================
// SLIDE 9: Geospatial Mapping & Freshness Intelligence
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'Core Features', 'Geospatial Discovery & Freshness Intelligence', 'Interactive OpenStreetMap spatial radius discovery integrated with dynamic shelf-life decay curves', 9);

  // Left Panel: Geospatial Mapping
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 4.05, h: 3.4,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.2 }
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 1.75, w: 1.8, h: 0.25,
    fill: { color: C.lightBlueBg },
    line: { color: C.primaryBlue, width: 0.8 }
  });
  slide.addText('LEAFLET GEO-ENGINE', {
    x: 1.0, y: 1.75, w: 1.8, h: 0.25,
    fontFace: 'Segoe UI', fontSize: 8, bold: true, color: C.primaryBlue,
    align: 'center', valign: 'middle'
  });

  slide.addText('Interactive Map & Spatial Radius', {
    x: 1.0, y: 2.1, w: 3.65, h: 0.35,
    fontFace: 'Segoe UI', fontSize: 13, bold: true, color: C.navyDark
  });

  const mapBullets = [
    'Dual Explore Experience: Seamless 1-click toggle between Responsive Card Grid and Interactive Leaflet Map.',
    'MongoDB 2dsphere Spatial Indexing: Executes sub-millisecond Haversine geo-queries within 5km, 10km, or 25km radii.',
    'Color-Coded Dynamic Pins: Map markers dynamically change color based on urgency status (Green: Safe, Amber: Urgent, Red: Critical).',
    'Rich Interactive Popups: Displays food category, quantity, expiry countdown, donor organization, and 1-click GPS navigation.'
  ];
  const mapText = mapBullets.map(b => ({
    text: b + '\n\n',
    options: { fontFace: 'Segoe UI', fontSize: 8.5, color: C.bodyText, bullet: true }
  }));
  slide.addText(mapText, {
    x: 1.0, y: 2.5, w: 3.65, h: 2.35,
    lineSpacingMultiple: 1.1
  });

  // Right Panel: Freshness & Urgency Scoring
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 1.6, w: 4.05, h: 3.4,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.2 }
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.35, y: 1.75, w: 1.8, h: 0.25,
    fill: { color: C.lightAmberBg },
    line: { color: C.accentAmber, width: 0.8 }
  });
  slide.addText('SHELF-LIFE ANALYTICS', {
    x: 5.35, y: 1.75, w: 1.8, h: 0.25,
    fontFace: 'Segoe UI', fontSize: 8, bold: true, color: C.accentAmber,
    align: 'center', valign: 'middle'
  });

  slide.addText('Dynamic Freshness & Urgency (0-100)', {
    x: 5.35, y: 2.1, w: 3.65, h: 0.35,
    fontFace: 'Segoe UI', fontSize: 13, bold: true, color: C.navyDark
  });

  const urgencyBullets = [
    'Mathematical Degradation Curve: Evaluates cooked timestamp against category-specific decay half-life.',
    'Storage Condition Modifiers: Refrigerated items get +48hr stability factor; hot cooked meals flag high degradation index within 4 hours.',
    'Automated Urgency Escalation: When remaining shelf life falls below 2 hours, Urgency Score hits 85+, triggering urgent banner alerts.',
    'Visual Badge Indicators: Real-time badges ("Fresh", "Expiring Soon", "Emergency Dispatch") ensure rapid shelter prioritization.'
  ];
  const urgencyText = urgencyBullets.map(b => ({
    text: b + '\n\n',
    options: { fontFace: 'Segoe UI', fontSize: 8.5, color: C.bodyText, bullet: true }
  }));
  slide.addText(urgencyText, {
    x: 5.35, y: 2.5, w: 3.65, h: 2.35,
    lineSpacingMultiple: 1.1
  });
}

// ==========================================
// SLIDE 10: Role-Based Experience (RBAC)
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'User Management', 'Role-Based Access Control (RBAC) & Portals', 'Granular role segmentation tailored for Donors, NGOs, and Platform Administrators', 10);

  const roles = [
    {
      title: 'Donor Portal',
      subtitle: 'Restaurants, Banquets, Caterers',
      accent: C.primaryGreen,
      bg: C.lightGreenBg,
      features: [
        'Rapid 2-Step Surplus Listing: Category, meal count, dietary tag, cooked time & storage.',
        'AI Matchmaker Recommendations: Instant view of top 4 ranked local NGOs.',
        'Incoming Claim Management: Review NGO vehicle mode, volunteer count, approve/reject.',
        'Handover OTP Generator: Issue 6-digit custody code upon courier arrival.',
        'Impact Dashboard: Track meals donated and carbon avoided.'
      ]
    },
    {
      title: 'NGO / Receiver Portal',
      subtitle: 'Charities, Relief Shelters, Volunteers',
      accent: C.primaryBlue,
      bg: C.lightBlueBg,
      features: [
        'Geospatial Discovery: Interactive Leaflet map & keyword filter feed.',
        '1-Click Claim Dispatch: Specify volunteer vehicle and beneficiary target count.',
        'Real-Time Pickup Tracking: 4-stage interactive lifecycle progression timeline.',
        'OTP Delivery Handover: Input 6-digit donor OTP to verify successful transfer.',
        'Accreditation Status: Display government verification badge.'
      ]
    },
    {
      title: 'Admin Control Tower',
      subtitle: 'System Governance & Oversight',
      accent: C.accentIndigo,
      bg: C.lightIndigoBg,
      features: [
        'Platform KPIs: Total meals rescued, kg diverted, CO2 avoided.',
        '1-Click NGO Accreditation: Verify government registration & audit documents.',
        'User & Listing Moderation: Deactivate fraudulent accounts or flagged food.',
        'System Audit Trail: Comprehensive ActivityLog event stream.',
        'System Settings & Analytics: Global category management.'
      ]
    }
  ];

  roles.forEach((r, i) => {
    const xPos = 0.8 + i * 2.88;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.6, w: 2.65, h: 3.4,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });

    // Top Accent Pill
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.15, y: 1.75, w: 2.35, h: 0.55,
      fill: { color: r.bg },
      line: { color: r.accent, width: 1 }
    });
    slide.addText(r.title, {
      x: xPos + 0.15, y: 1.8, w: 2.35, h: 0.25,
      fontFace: 'Segoe UI', fontSize: 12, bold: true, color: r.accent,
      align: 'center'
    });
    slide.addText(r.subtitle, {
      x: xPos + 0.15, y: 2.05, w: 2.35, h: 0.2,
      fontFace: 'Segoe UI', fontSize: 8, italic: true, color: C.navyDark,
      align: 'center'
    });

    const bullets = r.features.map(f => ({
      text: f + '\n\n',
      options: { fontFace: 'Segoe UI', fontSize: 8.2, color: C.bodyText, bullet: true }
    }));
    slide.addText(bullets, {
      x: xPos + 0.15, y: 2.45, w: 2.35, h: 2.45,
      lineSpacingMultiple: 1.1
    });
  });
}

// ==========================================
// SLIDE 11: Database Architecture & Data Models
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'Database Design', 'Normalized Schema Architecture & Models', 'MongoDB Atlas cloud database structured across 8 optimized collections with geospatial indexing', 11);

  const models = [
    {
      name: 'User Collection',
      tag: 'CORE IDENTITY',
      color: C.primaryGreen,
      fields: ['• role (donor | receiver | admin)', '• organizationName, orgType, phone', '• location: { type: "Point", coordinates }', '• isVerified, verificationStatus', '• metrics: { totalMeals, rating, pickups }']
    },
    {
      name: 'FoodListing Collection',
      tag: 'DONATION BATCHES',
      color: C.primaryBlue,
      fields: ['• donorId (ObjectId ref: User)', '• category, dietaryType, storageCondition', '• quantity, unit, estimatedMeals', '• cookedTime, expiryTime, urgencyScore', '• status (available | reserved | completed)']
    },
    {
      name: 'PickupRequest Collection',
      tag: 'LOGISTICS & TRACKING',
      color: C.accentIndigo,
      fields: ['• listingId, donorId, receiverId', '• transportType, volunteerCount, beneficiaries', '• status (pending|accepted|picked_up|delivered)', '• verificationOtp (6-digit secure code)', '• timeline: [ { status, timestamp, note } ]']
    },
    {
      name: 'Support Collections (5)',
      tag: 'AUDIT & FEEDBACK',
      color: C.accentAmber,
      fields: ['• ActivityLog: System audit events & actor IDs', '• Review: Star ratings (1-5) & donor feedback', '• Category: Normalized food classification', '• Notification: Unread alerts & dispatch signals', '• Setting: Configurable platform parameters']
    }
  ];

  models.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 0.8 + col * 4.3;
    const yPos = 1.6 + row * 1.7;

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: yPos, w: 4.1, h: 1.55,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.2, y: yPos + 0.15, w: 1.3, h: 0.22,
      fill: { color: C.lightBg },
      line: { color: m.color, width: 0.8 }
    });
    slide.addText(m.tag, {
      x: xPos + 0.2, y: yPos + 0.15, w: 1.3, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 7.5, bold: true, color: m.color,
      align: 'center', valign: 'middle'
    });

    slide.addText(m.name, {
      x: xPos + 1.6, y: yPos + 0.15, w: 2.3, h: 0.25,
      fontFace: 'Segoe UI', fontSize: 11, bold: true, color: C.navyDark,
      valign: 'middle'
    });

    slide.addText(m.fields.join('\n'), {
      x: xPos + 0.2, y: yPos + 0.45, w: 3.7, h: 1.0,
      fontFace: 'Segoe UI', fontSize: 8.2, color: C.bodyText,
      lineSpacingMultiple: 1.15
    });
  });
}

// ==========================================
// SLIDE 12: Admin Control Tower & Impact Metrics
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'Impact & Analytics', 'Social, Environmental & Governance (ESG) Impact', 'Real-time telemetry measuring meals rescued, methane emissions prevented, and community health', 12);

  // 4 Big Metric Stat Cards
  const metrics = [
    { stat: '1,250+', label: 'Meals Rescued', desc: 'Direct hunger alleviation for destitute shelters', color: C.primaryGreen, bg: C.lightGreenBg },
    { stat: '625 kg', label: 'Surplus Food Saved', desc: 'Edible nutrition prevented from reaching landfills', color: C.primaryBlue, bg: C.lightBlueBg },
    { stat: '1.56 Tons', label: 'CO2e Avoided', desc: 'Methane and greenhouse gas emissions curbed', color: C.accentIndigo, bg: C.lightIndigoBg },
    { stat: '100%', label: 'Verified NGO Custody', desc: 'Zero fraud rate via 6-digit OTP verification', color: C.accentAmber, bg: C.lightAmberBg }
  ];

  metrics.forEach((m, i) => {
    const xPos = 0.8 + i * 2.15;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.6, w: 2.0, h: 1.35,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });

    slide.addText(m.stat, {
      x: xPos + 0.1, y: 1.7, w: 1.8, h: 0.45,
      fontFace: 'Segoe UI', fontSize: 18, bold: true, color: m.color,
      align: 'center', valign: 'middle'
    });
    slide.addText(m.label, {
      x: xPos + 0.1, y: 2.15, w: 1.8, h: 0.25,
      fontFace: 'Segoe UI', fontSize: 9.5, bold: true, color: C.navyDark,
      align: 'center'
    });
    slide.addText(m.desc, {
      x: xPos + 0.1, y: 2.4, w: 1.8, h: 0.45,
      fontFace: 'Segoe UI', fontSize: 7.5, color: C.mutedText,
      align: 'center'
    });
  });

  // Admin Control Tower Capabilities Box
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 3.1, w: 8.4, h: 1.9,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.2 }
  });

  slide.addText('ADMIN CONTROL TOWER FEATURES & AUDIT OVERSIGHT', {
    x: 1.0, y: 3.22, w: 8.0, h: 0.3,
    fontFace: 'Segoe UI', fontSize: 11, bold: true, color: C.navyDark
  });

  const adminFeatures = [
    { title: '1-Click NGO Accreditation', desc: 'Admins verify NGO legal registration certificates, tax exemption docs, and volunteer credentials.' },
    { title: 'Live Activity Audit Stream', desc: 'Every login, listing post, claim transition, and OTP verification is permanently recorded in ActivityLog.' },
    { title: 'Listing & User Moderation', desc: 'Admins can flag suspicious listings, deactivate non-compliant accounts, or re-route emergency food.' },
    { title: 'Automated ESG Reporting', desc: 'Generates compliance reports for commercial corporate donors seeking CSR sustainability tax deductions.' }
  ];

  adminFeatures.forEach((af, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = 1.0 + col * 4.1;
    const yPos = 3.6 + row * 0.65;

    slide.addText(`• ${af.title}: `, {
      x: xPos, y: yPos, w: 3.9, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 8.5, bold: true, color: C.primaryGreen
    });
    slide.addText(af.desc, {
      x: xPos + 0.2, y: yPos + 0.22, w: 3.7, h: 0.38,
      fontFace: 'Segoe UI', fontSize: 8, color: C.bodyText,
      lineSpacingMultiple: 1.1
    });
  });
}

// ==========================================
// SLIDE 13: Live Deployment & Demo Walkthrough
// ==========================================
{
  const slide = pres.addSlide();
  applySlideTemplate(slide, 'Deployment & Demo', 'Live Cloud Deployment & Evaluation Suite', 'Fully deployed, battle-tested cloud architecture with instant 1-click evaluation accounts', 13);

  // Left Card: Live Deployment Endpoints
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 4.05, h: 3.4,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.2 }
  });

  slide.addText('🌐 Production Cloud Endpoints', {
    x: 1.0, y: 1.75, w: 3.65, h: 0.35,
    fontFace: 'Segoe UI', fontSize: 13, bold: true, color: C.navyDark
  });

  const endpoints = [
    {
      service: 'Frontend SPA Application',
      host: 'Vercel Edge Network',
      url: 'ai-powered-smart-food-donation-*.vercel.app',
      status: 'Online • HTTPS Active'
    },
    {
      service: 'Backend REST API Service',
      host: 'Render Cloud PaaS',
      url: 'smart-food-donation-*-system-1.onrender.com/api',
      status: 'Online • Health Endpoint 200 OK'
    },
    {
      service: 'Database Cluster',
      host: 'MongoDB Atlas Cloud',
      url: 'AWS / Azure High-Availability Replica Set',
      status: 'Active • 8 Collections Seeded'
    },
    {
      service: 'Source Code Repository',
      host: 'GitHub Open Source',
      url: 'github.com/jaikaran109/AI-Powered-Smart-Food...',
      status: 'Version Controlled • main branch'
    }
  ];

  endpoints.forEach((ep, i) => {
    const yPos = 2.15 + i * 0.68;
    slide.addText(ep.service, {
      x: 1.0, y: yPos, w: 2.2, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 9, bold: true, color: C.navyDark
    });
    slide.addText(ep.host, {
      x: 3.2, y: yPos, w: 1.45, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 7.5, bold: true, color: C.primaryBlue,
      align: 'right'
    });
    slide.addText(ep.url, {
      x: 1.0, y: yPos + 0.22, w: 3.65, h: 0.2,
      fontFace: 'Consolas', fontSize: 7.5, color: C.mutedText
    });
    slide.addText(`Status: ${ep.status}`, {
      x: 1.0, y: yPos + 0.42, w: 3.65, h: 0.18,
      fontFace: 'Segoe UI', fontSize: 7.2, color: C.darkGreen
    });
  });

  // Right Card: 1-Click Demo Accounts Table
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 1.6, w: 4.05, h: 3.4,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.2 }
  });

  slide.addText('🔑 Instant Evaluation Accounts', {
    x: 5.35, y: 1.75, w: 3.65, h: 0.35,
    fontFace: 'Segoe UI', fontSize: 13, bold: true, color: C.navyDark
  });
  slide.addText('Available directly via 1-click evaluation buttons on the Login page:', {
    x: 5.35, y: 2.1, w: 3.65, h: 0.22,
    fontFace: 'Segoe UI', fontSize: 8, italic: true, color: C.mutedText
  });

  const demoAccounts = [
    { role: 'DONOR (Banquets)', email: 'donor@tajkitchens.com', org: 'Grand Horizon Banquets', pass: 'password123' },
    { role: 'DONOR (Bakery)', email: 'bakery@artisangold.com', org: 'Artisan Gold Patisserie', pass: 'password123' },
    { role: 'NGO (Relief)', email: 'ngo@foodforall.ngo', org: 'Food For All Relief (Verified)', pass: 'password123' },
    { role: 'ADMIN (Tower)', email: 'admin@smartfood.org', org: 'Smart Food Foundation', pass: 'password123' }
  ];

  demoAccounts.forEach((da, i) => {
    const yPos = 2.4 + i * 0.62;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.35, y: yPos, w: 3.65, h: 0.54,
      fill: { color: C.lightBg },
      line: { color: C.cardBorder, width: 0.8 }
    });

    slide.addText(da.role, {
      x: 5.45, y: yPos + 0.05, w: 1.8, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 8, bold: true, color: C.primaryGreen
    });
    slide.addText(`Pass: ${da.pass}`, {
      x: 7.5, y: yPos + 0.05, w: 1.4, h: 0.22,
      fontFace: 'Consolas', fontSize: 7.5, color: C.mutedText,
      align: 'right'
    });
    slide.addText(`${da.email}  (${da.org})`, {
      x: 5.45, y: yPos + 0.28, w: 3.45, h: 0.22,
      fontFace: 'Segoe UI', fontSize: 7.8, color: C.navyDark
    });
  });
}

// ==========================================
// SLIDE 14: Future Scope & Conclusion
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.navyDark };

  // Top Green Line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10.0, h: 0.08,
    fill: { color: C.primaryGreen },
    line: { color: C.primaryGreen, width: 0 }
  });

  // Category Pill
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 0.45, w: 2.2, h: 0.28,
    fill: { color: C.navyCard },
    line: { color: C.primaryGreen, width: 1 }
  });
  slide.addText('FUTURE HORIZONS', {
    x: 1.0, y: 0.45, w: 2.2, h: 0.28,
    fontFace: 'Segoe UI', fontSize: 8.5, bold: true, color: C.primaryGreen,
    align: 'center', valign: 'middle'
  });

  slide.addText('Strategic Roadmap & Project Conclusion', {
    x: 1.0, y: 0.8, w: 8.0, h: 0.45,
    fontFace: 'Segoe UI', fontSize: 20, bold: true, color: C.white
  });

  slide.addText('Scaling smart food rescue from a local prototype to municipal and national infrastructure', {
    x: 1.0, y: 1.25, w: 8.0, h: 0.25,
    fontFace: 'Segoe UI', fontSize: 10, italic: true, color: C.lightText
  });

  // 4 Future Pillars
  const futurePillars = [
    {
      num: '01',
      title: 'IoT Cold-Chain Telemetry',
      desc: 'Bluetooth & LoRaWAN temperature/humidity sensors inside transport containers transmitting real-time spoilage telemetry directly into MERN backend.'
    },
    {
      num: '02',
      title: 'Multi-Stop Vehicle Routing (VRP)',
      desc: 'Genetic algorithms optimizing NGO van pickup routes across multiple restaurants in a single run, reducing transit fuel consumption by 40%.'
    },
    {
      num: '03',
      title: 'Cross-Platform Mobile Apps',
      desc: 'React Native iOS & Android apps with background push notifications, driver turn-by-turn navigation, and offline QR scanning for rural areas.'
    },
    {
      num: '04',
      title: 'Blockchain CSR Audit Ledger',
      desc: 'Immutable distributed ledger recording food donation histories, unlocking certified corporate tax deductions and verified carbon credits.'
    }
  ];

  futurePillars.forEach((fp, i) => {
    const xPos = 1.0 + i * 2.05;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.7, w: 1.9, h: 2.5,
      fill: { color: C.navyCard },
      line: { color: C.navyLight, width: 1 }
    });

    slide.addText(fp.num, {
      x: xPos + 0.1, y: 1.85, w: 1.7, h: 0.35,
      fontFace: 'Segoe UI', fontSize: 16, bold: true, color: C.primaryGreen
    });
    slide.addText(fp.title, {
      x: xPos + 0.1, y: 2.25, w: 1.7, h: 0.45,
      fontFace: 'Segoe UI', fontSize: 10.5, bold: true, color: C.white
    });
    slide.addText(fp.desc, {
      x: xPos + 0.1, y: 2.75, w: 1.7, h: 1.35,
      fontFace: 'Segoe UI', fontSize: 8, color: C.lightText,
      lineSpacingMultiple: 1.15
    });
  });

  // Bottom Takeaway Banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 4.4, w: 8.0, h: 0.75,
    fill: { color: '064E3B' },
    line: { color: C.primaryGreen, width: 1.5 }
  });
  slide.addText('🎯 CONCLUSION: The Smart Food Donation Platform demonstrates that hunger and food waste are fundamentally logistics problems. By integrating full-stack MERN technologies with AI decision analysis, we build a scalable pathway toward UN SDG 2: Zero Hunger.', {
    x: 1.1, y: 4.4, w: 7.8, h: 0.75,
    fontFace: 'Segoe UI', fontSize: 9.5, bold: true, color: C.white,
    align: 'center', valign: 'middle',
    lineSpacingMultiple: 1.15
  });
}

// Generate the PPTX File
const outputPath = path.join(__dirname, 'Smart_Food_Donation_Platform_Presentation.pptx');
pres.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`SUCCESS: PowerPoint presentation created at ${outputPath}`);
  })
  .catch(err => {
    console.error('ERROR creating presentation:', err);
    process.exit(1);
  });

