import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Heart, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function UserSavedTrips() {
  const [savedPackages, setSavedPackages] = useState([]);

  useEffect(() => {
    // In a real app, this would fetch from a user's wishlist array.
    // For this mock, we'll just grab some random packages to simulate saved items
    const allPackages = storage.getAll(storage.KEYS.PACKAGES);
    // Just mock that the first two packages are "saved"
    setSavedPackages(allPackages.slice(0, 2));
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Saved Trips</h1>
          <p className="text-slate-500 font-medium">Your personalized wishlist of dream destinations.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search your wishlist..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
          <Button variant="outline" className="w-full md:w-auto gap-2 rounded-xl h-11 border-slate-200 text-slate-700 font-bold hover:bg-slate-50">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        {savedPackages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-24 w-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-rose-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h3>
            <p className="text-slate-500 max-w-md mb-8">Keep track of the packages you love by clicking the heart icon on any destination.</p>
            <Button asChild className="rounded-xl px-8 h-12 bg-slate-900 text-white hover:bg-primary font-bold shadow-lg">
              <Link to="/packages">Explore Packages</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPackages.map((pkg, idx) => (
              <motion.div 
                key={pkg.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] p-4 shadow-glass border border-slate-100 group relative"
              >
                <div className="absolute top-6 right-6 z-10">
                  <button className="h-10 w-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 shadow-sm hover:scale-110 transition-transform">
                    <Heart className="h-5 w-5 fill-rose-500" />
                  </button>
                </div>
                <div className="h-48 rounded-[1.5rem] overflow-hidden mb-4 relative">
                  <img src={pkg.imageUrl} alt={pkg.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 font-extrabold px-3 py-1.5 rounded-xl text-sm shadow-sm">
                      ${pkg.price?.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">{pkg.title}</h3>
                  <p className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-1">
                    {pkg.destination} • {pkg.durationDays} Days
                  </p>
                  <Button asChild className="w-full rounded-xl bg-slate-50 text-slate-900 hover:bg-slate-900 hover:text-white font-bold transition-colors">
                    <Link to={`/packages/${pkg.id}`}>View Details</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </motion.div>
    </div>
  );
}
