import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlaneTakeoff, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const session = storage.getSession();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/packages' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed top-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-500">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`mx-auto max-w-360 transition-all duration-500 rounded-full glass-panel shadow-island flex items-center justify-between ${
          isScrolled ? 'py-3 px-6 bg-white/90' : 'py-4 px-6 bg-white/60'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-tropical text-white p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-500/30">
            <PlaneTakeoff className="h-6 w-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Qube<span className="text-primary">Travel</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex bg-slate-900/5 rounded-full p-1 border border-white/40 backdrop-blur-sm mr-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`relative px-5 py-2 text-sm font-bold transition-colors rounded-full z-10 ${
                  isActive(link.path) 
                    ? 'text-white' 
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {isActive(link.path) && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            ))}
          </div>
          
          {session ? (
            <Button asChild className="rounded-full px-8 h-12 bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all hidden lg:flex font-bold">
              <Link to={session.role === 'admin' ? '/admin' : '/dashboard'}>
                {session.role === 'admin' ? 'Admin Portal' : 'My Dashboard'}
              </Link>
            </Button>
          ) : (
            <Button asChild className="rounded-full px-8 h-12 bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all hidden lg:flex font-bold">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-slate-900 bg-slate-100 hover:bg-slate-200 h-12 w-12">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] rounded-l-3xl bg-white border-l-0 shadow-2xl p-8">
              <SheetTitle className="text-2xl font-bold flex items-center gap-2 mb-10">
                <PlaneTakeoff className="h-6 w-6 text-primary" /> QubeTravel
              </SheetTitle>
              <SheetDescription className="sr-only">Navigation</SheetDescription>
              
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-bold px-4 py-4 rounded-2xl transition-all ${
                      isActive(link.path) ? 'bg-orange-50 text-primary' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto absolute bottom-8 left-8 right-8">
                <Button asChild className="w-full rounded-2xl h-14 text-lg font-bold shadow-lg shadow-primary/30" onClick={() => setIsOpen(false)}>
                  <Link to="/packages">Explore Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </div>
  );
}
