import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlaneTakeoff, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
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
    <div className="fixed top-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-300">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`mx-auto max-w-7xl transition-all duration-300 rounded-full ${
          isScrolled 
            ? 'glass-panel shadow-island py-3 px-6' 
            : 'bg-transparent py-4 px-2 md:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-tropical text-white p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-500/30">
              <PlaneTakeoff className="h-6 w-6" />
            </div>
            <span className={`text-2xl font-extrabold tracking-tight ${isScrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-white text-shadow'}`}>
              Qube<span className="text-primary">Travel</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex bg-slate-100/50 rounded-full p-1 border border-white/20 backdrop-blur-sm mr-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`relative px-5 py-2 text-sm font-semibold transition-colors rounded-full z-10 ${
                    isActive(link.path) 
                      ? 'text-white' 
                      : (isScrolled || location.pathname !== '/' ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white')
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
            
            <Button asChild className="rounded-full px-8 bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all hidden lg:flex">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={`rounded-full ${isScrolled || location.pathname !== '/' ? 'text-slate-900 bg-slate-100/50' : 'text-white bg-black/20 backdrop-blur-md'}`}>
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
                      className={`text-lg font-semibold px-4 py-4 rounded-2xl transition-all ${
                        isActive(link.path) ? 'bg-orange-50 text-primary' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                
                <div className="mt-auto absolute bottom-8 left-8 right-8">
                  <Button asChild className="w-full rounded-2xl h-14 text-lg shadow-lg shadow-primary/30" onClick={() => setIsOpen(false)}>
                    <Link to="/packages">Explore Now</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </motion.nav>
    </div>
  );
}
