# Smart Food Donation Platform (SFD)
> **Full Stack MERN Web Application — Capstone Project**  
> *Connecting Surplus Food Donors with Verified NGOs via AI Demand Forecasting and Real-Time Logistics Tracking.*

---

## 🌟 Key Features

- **🔐 Robust Authentication & Role-Based Access (RBAC):**
  - Granular role isolation for **Food Donors**, **NGO Receivers**, and **Platform Administrators**.
  - Secure password hashing (`bcryptjs`) & JWT session management.
  - 1-Click Evaluation Accounts on the Login screen for instant testing.

- **🍲 Food Listing & Lifecycle Management (CRUD):**
  - Comprehensive listing attributes: food category, dietary type, quantity, cooked timestamp, expiry deadline, storage condition, and pickup location.
  - **Dynamic Urgency Scoring (0-100)** and real-time freshness badge indicators.
  - Multi-faceted search, category filtering, dietary sorting, and status toggling.

- **🚚 Real-Time Pickup Tracking & Handover Security:**
  - 4-Stage Status Pipeline: `Pending` ➔ `Accepted` ➔ `Picked Up` ➔ `Delivered`.
  - Secure **6-digit Handover OTP Verification** to ensure verified custody transfer.
  - Comprehensive audit trail and donation lifecycle event logs.

- **🗺️ Interactive Geospatial Maps:**
  - Dual explore view: Responsive Grid Feed and Interactive Leaflet (OpenStreetMap) radius map.

- **🤖 Smart AI Demand & Spoilage Prediction Studio:**
  - Food shelf-life degradation curve evaluation and cold chain storage recommendations.
  - Geographic zone demand heatmaps and peak surplus timing forecast.

- **🛡️ Admin Control Tower & Analytics:**
  - Aggregate KPIs (Meals saved, kg food rescued, CO2 avoided, community value).
  - User moderation and 1-click NGO accreditation verification.
  - Platform audit trail and listing moderation.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Vite), React Router DOM v6, Lucide Icons, Leaflet / React-Leaflet, Chart.js |
| **Backend** | Node.js, Express.js RESTful API, Express-Validator |
| **Database** | MongoDB & Mongoose ODM (8 Collections with Geospatial Indexes) |
| **Auth & Security** | JSON Web Tokens (JWT), bcryptjs, CORS |
| **Styling** | Custom Vanilla CSS Design System with Dark/Light Theme & Glassmorphism |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) running locally on port 27017 or a MongoDB Atlas URI

### 1. Installation
Install all dependencies for root, backend, and frontend with a single command:
```bash
npm run install:all
```
*(Or navigate to `backend/` and `frontend/` and run `npm install` in each)*

### 2. Seed Database with Realistic Data
Populate realistic Donors, NGOs, Listings, Pickup lifecycles, and Analytics:
```bash
npm run seed
```

### 3. Run Development Servers
Start both backend API (`http://localhost:5000`) and frontend Vite dev server (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

---

## 🔑 Pre-Configured Demo Accounts

For rapid evaluation, use the 1-click buttons on the Login page or log in manually:

| Role | Email | Password | Organization |
|---|---|---|---|
| **Donor** | `donor@tajkitchens.com` | `password123` | Grand Horizon Banquets & Catering |
| **Donor** | `bakery@artisangold.com` | `password123` | Artisan Gold Bakery & Patisserie |
| **NGO** | `ngo@foodforall.ngo` | `password123` | Food For All Relief Foundation (Verified) |
| **NGO** | `shelter@hopecommunity.ngo` | `password123` | Hope Children & Homeless Shelter |
| **Admin** | `admin@smartfood.org` | `password123` | Smart Food Donation Platform |

---

## 📁 Repository Structure

```
SFD-Anti/
├── backend/
│   ├── src/
│   │   ├── config/ (MongoDB connection)
│   │   ├── models/ (8 Mongoose models: User, FoodListing, PickupRequest, Category, etc.)
│   │   ├── middleware/ (JWT Auth, RBAC, Central Error Handler, Validator)
│   │   ├── controllers/ (Auth, Listings, Pickups, Analytics, AI, Users, Reviews)
│   │   ├── routes/ (REST API endpoints)
│   │   ├── utils/ (AI Predictor, Activity Logger, Database Seeder)
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ (Navbar, Footer, StatCards, ListingCards, FoodMap, Timelines, AI Widgets)
│   │   ├── context/ (AuthContext, NotificationContext, ThemeContext)
│   │   ├── pages/ (12 Pages: Home, Listings, Details, Create, Dashboards, AI Studio, Impact, Auth)
│   │   ├── services/ (Centralized Axios/Fetch API client)
│   │   ├── styles/ (Modern design system: dark/light theme, glassmorphism)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
├── docs/
│   ├── SRS.md (IEEE 830 compliant Software Requirements Specification)
│   ├── API_DOCUMENTATION.md (Full REST API schemas)
│   └── DATABASE_DESIGN.md (ER diagrams & schemas)
├── package.json (Concurrently orchestration)
└── README.md
```

---

## 📄 Documentation
- [Software Requirements Specification (SRS)](docs/SRS.md)
- [REST API Documentation](docs/API_DOCUMENTATION.md)
- [Database Architecture & Design](docs/DATABASE_DESIGN.md)

---

## 📜 License
MIT License. Built for Capstone Project Demonstration.
