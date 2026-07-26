# Qube Travel

A production-quality, industry-standard responsive business website for a premium travel agency, built with React and Vite.

## Features

- **Public Facing Site**: Stunning, responsive landing pages with Framer Motion animations.
- **Package Exploration**: Advanced filtering and sorting for travel packages.
- **Booking Flow**: Multi-step booking process with full validation.
- **Authentication**: Role-based access control (Admin & User).
- **Admin Dashboard**: Full CRUD for packages, booking management, and inquiry resolution.
- **LocalDB**: Fully functional mock backend using `localStorage` with initial seed data.

## Tech Stack

- **Framework**: React 19 + Vite
- **Routing**: React Router DOM (v7) with Lazy Loading & Suspense
- **Styling**: Tailwind CSS, class-variance-authority, clsx, tailwind-merge
- **UI Components**: shadcn/ui, Radix UI primitives, Lucide React icons
- **Animations**: Framer Motion, Animate.css
- **Forms & Validation**: React Hook Form, Zod
- **Notifications**: React Toastify

## Setup Instructions

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

## Admin Access

To access the admin dashboard, navigate to `/auth` or click the "Admin Login" link in the footer.

**Seed Credentials:**
- **Email:** `admin@qubetravel.com`
- **Password:** `password123`

## LocalStorage Reset

The application simulates a backend database using the browser's `localStorage`. 
- Data is seeded automatically on the first load.
- If you need to completely reset the database to its initial state, you can clear your browser's Local Storage for this domain (or delete the `qt_db_version` key) and refresh the page.

## QA Checklist

- [x] **Responsiveness**: All pages scale perfectly down to mobile (320px). Mobile navbar uses a slide-out sheet.
- [x] **Forms**: All inputs have proper Zod schemas (email regex, phone patterns, minimum values).
- [x] **Validation**: Inline error messages display properly on blur/submit. Submit buttons are disabled during processing.
- [x] **Accessibility (a11y)**: Focus states are clear, semantic HTML is used, and Radix UI primitives provide aria attributes.
- [x] **Edge Cases**: Empty states are handled gracefully (e.g., "No packages found" when filtering).
- [x] **Data Integrity**: Stable IDs are used for all local storage entries.

---
*Built for Qube Travel.*
