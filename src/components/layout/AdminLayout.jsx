import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { PlaneTakeoff, LayoutDashboard, PackageSearch, BookOpenCheck, MessageSquare, Settings, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  const session = storage.getSession();

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

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
            <PlaneTakeoff className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg tracking-tight">Qube Travel</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path}
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

        <div className="p-4 border-t border-slate-800">
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-slate-800 hover:text-white text-slate-300" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="font-semibold text-slate-800">Admin Portal</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">Logged in as <strong>{session.email}</strong></span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
