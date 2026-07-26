import { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { PlaneTakeoff, LayoutDashboard, PackageSearch, BookOpenCheck, MessageSquare, Settings, LogOut, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLayout() {
  const location = useLocation();
  const session = storage.getSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    storage.logout();
    window.location.href = '/';
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Packages', path: '/admin/packages', icon: PackageSearch },
    { name: 'Bookings', path: '/admin/bookings', icon: BookOpenCheck },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const NavLinks = ({ onClick }) => (
    <>
      <nav className="flex-1 py-8 px-4 space-y-2 relative z-10">
        <div className="mb-8 px-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Menu</p>
        </div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path}
              onClick={onClick}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-active-nav"
                  className="absolute inset-0 bg-gradient-tropical rounded-2xl -z-10 shadow-lg shadow-orange-500/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {!isActive && (
                <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              )}
              <item.icon className="h-5 w-5" />
              <span className="font-semibold">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-6 mt-auto relative z-10">
        <div className="bg-white/5 rounded-3xl p-5 backdrop-blur-md border border-white/10 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-tropical flex items-center justify-center text-white font-bold">
              {session.email.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{session.email}</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-white/20 text-white hover:bg-white hover:text-slate-900 transition-colors bg-transparent" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-slate-100 relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[100px] mix-blend-multiply animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* Desktop Sidebar (Floating Glassmorphism) */}
      <aside className="hidden md:flex w-72 bg-slate-950 flex-col shrink-0 m-4 rounded-[3rem] overflow-hidden shadow-2xl relative z-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        <div className="h-24 flex items-center px-8 relative z-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white/10 p-2.5 rounded-2xl group-hover:bg-primary transition-colors">
              <PlaneTakeoff className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">Qube<span className="text-primary">Travel</span></span>
          </Link>
        </div>
        <NavLinks />
      </aside>

      {/* Main Content (Floating Box) */}
      <main className="flex-1 flex flex-col w-full h-[calc(100vh-2rem)] md:my-4 md:mr-4 bg-white/70 backdrop-blur-xl md:rounded-[3rem] shadow-glass border border-white/50 relative z-20 overflow-hidden">
        <header className="h-24 flex items-center justify-between px-8 shrink-0 bg-white/40 backdrop-blur-md border-b border-white/40">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white shadow-sm hover:bg-slate-50">
                    <Menu className="h-6 w-6 text-slate-700" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 bg-slate-950 border-r-0 flex flex-col">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                  <div className="h-24 flex items-center px-8 shrink-0 relative z-10">
                    <SheetTitle className="flex items-center gap-3">
                      <div className="bg-gradient-tropical p-2 rounded-xl">
                        <PlaneTakeoff className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white font-extrabold text-xl">QubeTravel Admin</span>
                    </SheetTitle>
                  </div>
                  <NavLinks onClick={() => setIsMobileOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
            
            <div>
              <h2 className="font-extrabold text-slate-900 text-2xl">Portal <span className="text-primary">Overview</span></h2>
              <p className="text-slate-500 text-sm font-medium hidden sm:block">Manage your travel empire.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {/* Additional header actions could go here */}
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
