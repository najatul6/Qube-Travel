import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, Compass, Shield, Heart, ArrowRight } from 'lucide-react';

export default function Home() {
  const [featuredPackages, setFeaturedPackages] = useState([]);

  useEffect(() => {
    const packages = storage.getAll(storage.KEYS.PACKAGES);
    setFeaturedPackages(packages.filter(p => p.featured).slice(0, 3));
  }, []);

  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-32 pb-24 overflow-hidden bg-slate-50">
        
        {/* Background Mesh & Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply animate-float pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[100px] mix-blend-multiply animate-float pointer-events-none" style={{ animationDelay: '3s' }} />
        
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 lg:col-span-5 flex flex-col justify-center relative"
          >
            {/* Floating Badge above text */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
              className="absolute -top-12 -left-8 glass-panel px-4 py-2 rounded-2xl hidden md:flex items-center gap-2 shadow-xl animate-float" style={{ animationDelay: '1s' }}
            >
              <span className="text-xl">✈️</span>
              <span className="font-bold text-slate-700 text-sm">Flights Included</span>
            </motion.div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 font-bold text-sm self-start">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              2026 Summer Collection Live
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-slate-900 leading-[1.05]">
              Escape the <br />
              <span className="text-gradient animate-gradient-x relative inline-block">
                Ordinary
                <svg className="absolute w-full h-6 -bottom-2 left-0 text-orange-400 opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 font-medium max-w-lg leading-relaxed">
              Curated luxury travel experiences to the world's most breathtaking destinations. Pack your bags, we handle the rest.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6">
              <Button size="lg" asChild className="rounded-full px-10 h-16 text-lg font-bold bg-slate-900 hover:bg-primary text-white shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto group">
                <Link to="/packages">
                  Start Exploring 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-10 h-16 text-lg font-bold border-2 border-slate-300 hover:border-slate-900 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 shadow-sm w-full sm:w-auto">
                <Link to="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Imagery - Enhanced Overlapping Layout */}
          <div className="lg:col-span-7 relative hidden lg:block h-[700px]">
            
            {/* Main Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[550px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white z-20 group"
            >
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80" alt="Travel Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Top Right Smaller Image */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="absolute top-4 right-4 w-[280px] h-[320px] rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white z-10 rotate-6 group"
            >
              <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80" alt="Travel Secondary" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </motion.div>

            {/* Bottom Left Smaller Image */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className="absolute bottom-12 left-4 w-[260px] h-[280px] rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white z-30 -rotate-3 group"
            >
              <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80" alt="Travel Tertiary" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </motion.div>

            {/* Floating Review Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-32 -left-12 glass-panel p-5 rounded-3xl flex items-center gap-4 z-40 shadow-2xl animate-float whitespace-nowrap border-white/60"
            >
              <div className="bg-slate-900 p-3 rounded-2xl text-amber-400 shrink-0">
                <Star className="h-7 w-7 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                </div>
                <p className="font-extrabold text-slate-900 text-lg leading-tight">4.9/5 Rating</p>
                <p className="text-sm text-slate-500 font-medium">10,000+ Happy Travelers</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust & Features */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden my-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6 flex flex-col items-center md:items-start">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary backdrop-blur-md border border-white/10">
                <Compass className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Expert Curation</h3>
              <p className="text-slate-400 text-lg leading-relaxed">Every itinerary is hand-picked by our seasoned travel experts to ensure premium quality, hidden gems, and unforgettable moments.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-6 flex flex-col items-center md:items-start">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-teal-400 backdrop-blur-md border border-white/10">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Secure & Reliable</h3>
              <p className="text-slate-400 text-lg leading-relaxed">Book with total peace of mind. Your payments, personal details, and travel insurance are managed with bank-level security.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6 flex flex-col items-center md:items-start">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-rose-400 backdrop-blur-md border border-white/10">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Personalized Care</h3>
              <p className="text-slate-400 text-lg leading-relaxed">Enjoy 24/7 dedicated concierge support before, during, and after your trip. We're always just a message away.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Trending <span className="text-primary">Destinations</span></h2>
              <p className="text-slate-500 text-xl font-medium">Explore our most popular and highly-rated travel packages curated just for you.</p>
            </div>
            <Button variant="ghost" asChild className="group text-lg font-bold hover:text-primary hover:bg-orange-50 px-6 rounded-full h-14 transition-all mx-auto md:mx-0">
              <Link to="/packages" className="flex items-center gap-2">View All <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative h-full"
              >
                <div className="relative h-full min-h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col justify-end">
                  <div className="absolute inset-0">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="relative p-8 text-white z-10 w-full">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-3 opacity-90">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-semibold tracking-wide uppercase text-sm">{pkg.destination}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 leading-tight">{pkg.title}</h3>
                      
                      <div className="flex flex-wrap items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-6 gap-2">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Clock className="h-5 w-5 text-slate-300" />
                          <span>{pkg.durationDays} Days</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-bold text-amber-400">
                          <Star className="h-5 w-5 fill-current" />
                          <span>{pkg.rating}</span>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full rounded-2xl h-14 bg-white text-slate-900 hover:bg-slate-100 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 font-bold text-lg">
                        <Link to={`/packages/${pkg.id}`}>Explore Package</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
