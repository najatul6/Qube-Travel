import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { storage } from '@/lib/storage';
import { toast } from 'react-toastify';
import { PlaneTakeoff, MapPin, Phone, Mail, Globe, MessageCircle, Camera } from 'lucide-react';

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
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <PlaneTakeoff className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-white">Qube Travel</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Crafting extraordinary journeys for the modern explorer. Experience the world like never before with our premium curated travel packages.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Camera className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/packages" className="hover:text-primary transition-colors">Destinations</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">Travel FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>{settings.address || '123 Explorer Way, WL 90210'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>{settings.phone || '+1 (555) 123-4567'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>{settings.email || 'hello@qubetravel.com'}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">Subscribe to receive travel inspiration and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 h-12"
                required
              />
              <Button type="submit" className="w-full h-12">Subscribe</Button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {settings.companyName || 'Qube Travel'}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/auth" className="hover:text-white transition-colors">Admin Portal</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
