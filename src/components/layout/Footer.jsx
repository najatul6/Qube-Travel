import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { storage } from '@/lib/storage';
import { toast } from 'react-toastify';
import { PlaneTakeoff, MapPin, Phone, Mail, Globe, MessageCircle, Camera, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [settings, setSettings] = useState({});

  useEffect(() => {
    setSettings(storage.getSettings() || {});
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    storage.create(storage.KEYS.NEWSLETTER, { email });
    toast.success('Successfully subscribed to our newsletter!');
    setEmail('');
  };

  return (
    <div className="w-full bg-slate-950 text-slate-300 relative overflow-hidden mt-12">
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <footer className="w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
          
          {/* Brand */}
          <div className="space-y-6 lg:pr-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-tropical text-white p-2.5 rounded-xl shadow-lg">
                <PlaneTakeoff className="h-6 w-6" />
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-white">QubeTravel</span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed">
              Curating luxury, adventurous, and serene travel experiences across the globe. Your next great story starts here.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-1 transition-all">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-1 transition-all">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-1 transition-all">
                <Camera className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Discover</h4>
            <ul className="space-y-4">
              <li><Link to="/packages" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary"/> All Destinations</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary"/> Our Story</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary"/> Travel FAQs</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary"/> Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Reach Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2.5 rounded-xl"><MapPin className="h-5 w-5 text-primary" /></div>
                <span className="text-slate-400">{settings.address || '123 Explorer Way, WL 90210'}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 p-2.5 rounded-xl"><Phone className="h-5 w-5 text-primary" /></div>
                <span className="text-slate-400 font-medium">{settings.phone || '+1 (555) 123-4567'}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 p-2.5 rounded-xl"><Mail className="h-5 w-5 text-primary" /></div>
                <span className="text-slate-400">{settings.email || 'hello@qubetravel.com'}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
            <h4 className="text-white font-bold text-lg mb-2">Get Inspired</h4>
            <p className="text-sm text-slate-400 mb-6">Join 10,000+ travelers receiving weekly secret deals and tips.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 h-12 rounded-xl focus-visible:ring-primary"
                required
              />
              <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold">Subscribe</Button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 relative z-10">
          <p>&copy; {new Date().getFullYear()} {settings.companyName || 'Qube Travel'}. Crafted for adventurers.</p>
          <div className="flex gap-6 font-medium">
            <Link to="/auth" className="hover:text-white transition-colors">Admin Portal</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
        </footer>
      </div>
    </div>
  );
}
