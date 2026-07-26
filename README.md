# Qube Travel

A production-quality, industry-standard responsive business website and portal for a premium travel agency, built with React and Vite. 

Recently updated with a stunning **Tropical Vibrant & Floating Glassmorphism** design system, delivering a highly modern, app-like user experience.

## ✨ Core Features

- **Tropical UI Aesthetics**: Custom vibrant gradients (Sunset Orange & Ocean Teal), massive border radii (`rounded-[3rem]`), floating glass navigation islands, and immersive mesh-gradient backgrounds.
- **Public Facing Site**: Responsive landing pages with Framer Motion spring physics, overlapping polaroid layouts, and high-contrast glass panels.
- **Package Exploration**: Advanced filtering and sorting for travel packages with fluid `layout` animations.
- **Booking Flow**: Multi-step booking process with full Zod validation.
- **Role-Based Portals**:
  - **Admin Dashboard**: Full CRUD for packages, booking management, and inquiry resolution. Housed in a dark-glass sidebar layout with glowing KPI metrics.
  - **Customer Dashboard**: A personalized portal for users to track their saved trips and view their specific upcoming/past reservations.
- **LocalDB Mock Backend**: Fully functional data layer using `localStorage` with intelligent seeding.

## 🚀 Tech Stack

- **Framework**: React 19 + Vite
- **Routing**: React Router DOM (v7) with Lazy Loading & Suspense
- **Styling**: Tailwind CSS (v3.4.1), class-variance-authority, clsx, tailwind-merge
- **UI Components**: shadcn/ui, Radix UI primitives, Lucide React icons
- **Animations**: Framer Motion
- **Forms & Validation**: React Hook Form, Zod
- **Notifications**: React Toastify

## 🛠️ Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Authentication & Access

The application simulates a backend authentication system using `localStorage`. Role routing is handled automatically based on the login email.

Navigate to `/auth` (or click "Sign In" in the navigation bar).

**Admin Credentials (routes to `/admin`):**
- **Email:** `admin@qubetravel.com`
- **Password:** `password123`

**Customer Credentials (routes to `/dashboard`):**
- **Email:** `user@example.com` (or any other email)
- **Password:** `password123`

## 💾 LocalStorage Reset

The application simulates a backend database using the browser's `localStorage`. 
- Data is seeded automatically on the first load.
- If you need to completely reset the database to its initial state, you can clear your browser's Local Storage for this domain (or delete the `qt_db_version` key) and refresh the page.

## ✅ QA Checklist

- [x] **Responsiveness**: All pages (Public, Admin, User) scale perfectly down to mobile (320px). Mobile navigation uses custom slide-out glass sheets.
- [x] **Forms**: All inputs have proper Zod schemas (email regex, phone patterns, minimum values).
- [x] **Validation**: Inline error messages display properly on blur/submit. Submit buttons are disabled during processing.
- [x] **Accessibility (a11y)**: Semantic HTML is used, and Radix UI primitives provide aria attributes.
- [x] **Edge Cases**: Empty states are handled gracefully (e.g., "No packages found", "No bookings yet") with custom placeholder UI.
- [x] **Data Integrity**: Stable IDs are used for all local storage entries, and role-based filtering ensures users only see their own data.

---
*Built for Qube Travel.*
