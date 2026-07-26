import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Star, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
    setPackages(storage.getAll(storage.KEYS.PACKAGES));
  }, []);

  const regions = ['all', ...new Set(packages.map(p => p.region).filter(Boolean))];

  const filteredPackages = useMemo(() => {
    let result = packages;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q));
    }

    if (regionFilter !== 'all') {
      result = result.filter(p => p.region === regionFilter);
    }

    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'duration-asc': return a.durationDays - b.durationDays;
        case 'duration-desc': return b.durationDays - a.durationDays;
        case 'featured': return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default: return 0;
      }
    });

    return result;
  }, [packages, searchQuery, regionFilter, sortOption]);

  return (
    <div className="min-h-screen">
      
      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-24 relative overflow-hidden rounded-b-[4rem] mx-4 md:mx-8 mb-16 shadow-xl">
        <div className="absolute inset-0 bg-gradient-tropical opacity-20 mix-blend-overlay" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/30 rounded-full blur-[80px]" />
        
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Explore <span className="text-primary">Destinations</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-xl font-medium max-w-2xl mx-auto"
          >
            Discover carefully curated travel experiences designed to immerse you in the world's most spectacular locations.
          </motion.p>
        </div>
      </div>

      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* Floating Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-4 rounded-full flex flex-col md:flex-row gap-4 mb-16 sticky top-28 z-40 mx-auto max-w-5xl"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search destinations..." 
              className="pl-12 h-14 bg-white border-0 shadow-sm rounded-full text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-[160px] h-14 bg-white border-0 shadow-sm rounded-full font-medium">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">All Regions</SelectItem>
                {regions.filter(r => r !== 'all').map(r => (
                  <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px] h-14 bg-white border-0 shadow-sm rounded-full font-medium">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="duration-asc">Duration: Short to Long</SelectItem>
                <SelectItem value="duration-desc">Duration: Long to Short</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Link to={`/packages/${pkg.id}`} className="block h-full">
                  <div className="h-full flex flex-col rounded-[2.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative">
                    
                    {pkg.featured && (
                      <div className="absolute top-6 right-6 z-20 bg-gradient-tropical text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                        Featured
                      </div>
                    )}
                    
                    <div className="relative h-72 overflow-hidden p-3 pb-0">
                      <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                        <img 
                          src={pkg.imageUrl} 
                          alt={pkg.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          <span className="glass-panel-dark text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-primary" /> {pkg.destination}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3 text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{pkg.durationDays} Days</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{pkg.rating} <span className="text-slate-400 font-normal">({pkg.reviews})</span></span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 line-clamp-1 mb-4 group-hover:text-primary transition-colors">
                        {pkg.title}
                      </h3>
                      
                      <p className="text-slate-500 text-base line-clamp-2 mb-8 flex-1 leading-relaxed">
                        {pkg.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">From</p>
                          <p className="text-3xl font-extrabold text-slate-900">${pkg.price?.toLocaleString()}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-slate-50 group-hover:bg-primary flex items-center justify-center transition-colors">
                          <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPackages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm"
          >
            <Filter className="h-16 w-16 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No packages found</h3>
            <p className="text-slate-500 text-lg">Try adjusting your filters or search query.</p>
            <Button size="lg" variant="outline" className="mt-8 rounded-full px-8 border-2" onClick={() => { setSearchQuery(''); setRegionFilter('all'); }}>
              Clear Filters
            </Button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
