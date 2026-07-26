import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import UserLayout from '@/components/layout/UserLayout';
import ProtectedRoute from '@/routes/ProtectedRoute';

// Public Pages
import Home from '@/pages/public/Home';
import Packages from '@/pages/public/Packages';
import PackageDetails from '@/pages/public/PackageDetails';
import Booking from '@/pages/public/Booking';
import BookingConfirmation from '@/pages/public/BookingConfirmation';
import About from '@/pages/public/About';
import Contact from '@/pages/public/Contact';
import FAQ from '@/pages/public/FAQ';
import Login from '@/pages/public/Login';
import NotFound from '@/pages/public/NotFound';

// Admin Pages
import Dashboard from '@/pages/admin/Dashboard';
import PackagesManager from '@/pages/admin/PackagesManager';
import BookingsManager from '@/pages/admin/BookingsManager';
import InquiriesManager from '@/pages/admin/InquiriesManager';
import SettingsManager from '@/pages/admin/SettingsManager';

// User Pages
import UserDashboard from '@/pages/user/UserDashboard';
import UserBookings from '@/pages/user/UserBookings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/book/:packageId" element={<Booking />} />
        <Route path="/booking/confirmation/:bookingId" element={<BookingConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/auth" element={<Login />} />

      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/packages" element={<PackagesManager />} />
        <Route path="/admin/bookings" element={<BookingsManager />} />
        <Route path="/admin/inquiries" element={<InquiriesManager />} />
        <Route path="/admin/settings" element={<SettingsManager />} />
      </Route>

      <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/bookings" element={<UserBookings />} />
        <Route path="/dashboard/saved" element={<UserDashboard />} />
        <Route path="/dashboard/profile" element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}
