import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-teal-50/40 pointer-events-none -z-10" />
      <Navbar />
      <main className="flex-1 w-full pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
