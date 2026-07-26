import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
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

  const regions = ['all', ...new Set(packages.map(p => p.region))];

  const filteredPackages = useMemo(() => {
    let result = packages;

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.destination.toLowerCase().includes(q)
      );
    }

    // Region filter
    if (regionFilter !== 'all') {
      result = result.filter(p => p.region === regionFilter);
    }

    // Sorting
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
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 mb-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Explore Our Packages</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Discover carefully curated travel experiences designed to immerse you in the world's most spectacular destinations.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-6">
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-10 sticky top-24 z-30">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search destinations..." 
              className="pl-10 h-12 bg-slate-50 border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-[160px] h-12 bg-slate-50 border-none">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.filter(r => r !== 'all').map(r => (
                  <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px] h-12 bg-slate-50 border-none">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="duration-asc">Duration: Short to Long</SelectItem>
                <SelectItem value="duration-desc">Duration: Long to Short</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow group flex flex-col rounded-2xl bg-white">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={pkg.imageUrl} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {pkg.featured && (
                      <div className="absolute top-4 right-4 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="bg-slate-900/80 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-primary" /> {pkg.destination}
                      </span>
                      <span className="bg-slate-900/80 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-primary" /> {pkg.durationDays} Days
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
                        {pkg.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 mb-4">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold text-slate-700">{pkg.rating} <span className="text-slate-400 font-normal">({pkg.reviews} reviews)</span></span>
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">
                      {pkg.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto border-t border-slate-100 pt-5">
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">From</p>
                        <p className="text-2xl font-bold text-slate-900">${pkg.price.toLocaleString()}</p>
                      </div>
                      <Button asChild className="rounded-full px-6">
                        <Link to={`/packages/${pkg.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <Filter className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No packages found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query.</p>
            <Button variant="outline" className="mt-6" onClick={() => { setSearchQuery(''); setRegionFilter('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
