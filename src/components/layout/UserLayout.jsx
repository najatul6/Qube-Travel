import { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { PlaneTakeoff, LayoutDashboard, Ticket, Heart, User, LogOut, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserLayout() {
  const location = useLocation();
  const session = storage.getSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Redirect admin to admin dashboard if they try to access user dashboard
  if (session.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    storage.logout();
    window.location.href = '/';
  };

  const navItems = [
    { name: 'My Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Bookings', path: '/dashboard/bookings', icon: Ticket },
    { name: 'Saved Trips', path: '/dashboard/saved', icon: Heart },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  const NavLinks = ({ onClick }) => (
    <>
      <nav className="flex-1 py-8 px-4 space-y-2 relative z-10">
        <div className="mb-8 px-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Travel Portal</p>
        </div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/dashboard');
          return (
            <Link 
              key={item.name} 
              to={item.path}
              onClick={onClick}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${
                isActive ? 'text-primary' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="user-active-nav"
                  className="absolute inset-0 bg-orange-50 rounded-2xl -z-10 border border-orange-100"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {!isActive && (
                <div className="absolute inset-0 bg-slate-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              )}
              <item.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="font-semibold">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-6 mt-auto relative z-10">
        <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
              {session.email.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{session.email}</p>
              <p className="text-xs text-slate-500">Explorer</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-slate-200 text-slate-700 hover:bg-white hover:text-slate-900 transition-colors shadow-sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-white flex-col shrink-0 m-4 rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 relative z-20">
        <div className="h-24 flex items-center px-8 relative z-10 border-b border-slate-50">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary/10 p-2.5 rounded-2xl group-hover:bg-primary transition-colors">
              <PlaneTakeoff className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">Qube<span className="text-primary">Travel</span></span>
          </Link>
        </div>
        <NavLinks />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full h-[calc(100vh-2rem)] md:my-4 md:mr-4 bg-white/70 backdrop-blur-xl md:rounded-[3rem] shadow-glass border border-slate-100 relative z-20 overflow-hidden">
        <header className="h-24 flex items-center justify-between px-8 shrink-0 bg-white/40 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white shadow-sm hover:bg-slate-50 border border-slate-100">
                    <Menu className="h-6 w-6 text-slate-700" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 bg-white border-r-slate-100 flex flex-col">
                  <div className="h-24 flex items-center px-8 shrink-0 relative z-10 border-b border-slate-50">
                    <SheetTitle className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2.5 rounded-xl">
                        <PlaneTakeoff className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-slate-900 font-extrabold text-xl">My Dashboard</span>
                    </SheetTitle>
                  </div>
                  <NavLinks onClick={() => setIsMobileOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
            
            <div>
              <h2 className="font-extrabold text-slate-900 text-2xl">Welcome <span className="text-secondary">Back</span></h2>
              <p className="text-slate-500 text-sm font-medium hidden sm:block">Manage your adventures.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="hidden sm:flex rounded-full border-primary/20 text-primary hover:bg-primary/5 font-bold">
              <Link to="/packages">Book a Trip</Link>
            </Button>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
