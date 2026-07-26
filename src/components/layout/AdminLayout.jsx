import { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { PlaneTakeoff, LayoutDashboard, PackageSearch, BookOpenCheck, MessageSquare, Settings, LogOut, Menu } from 'lucide-react';

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
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path}
              onClick={onClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-slate-800 mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-slate-800 hover:text-white text-slate-300" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-300 flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
            <PlaneTakeoff className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg tracking-tight">Qube Travel</span>
          </Link>
        </div>
        <NavLinks />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 bg-slate-900 text-slate-300 border-r-slate-800 flex flex-col">
                  <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
                    <SheetTitle className="text-white flex items-center gap-2">
                      <PlaneTakeoff className="h-6 w-6 text-primary" />
                      Qube Travel
                    </SheetTitle>
                  </div>
                  <NavLinks onClick={() => setIsMobileOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
            
            <h2 className="font-semibold text-slate-800 text-lg">Admin Portal</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:inline-block">Logged in as <strong>{session.email}</strong></span>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
