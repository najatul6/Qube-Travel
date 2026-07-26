import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Star, Compass, Shield, Heart } from 'lucide-react';

export default function Home() {
  const [featuredPackages, setFeaturedPackages] = useState([]);

  useEffect(() => {
    const packages = storage.getAll(storage.KEYS.PACKAGES);
    setFeaturedPackages(packages.filter(p => p.featured).slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80")' }}
        >
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>

        <div className="container relative z-10 text-center text-white px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-shadow-lg">
              Discover Your Next <span className="text-primary">Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto text-shadow">
              Curated luxury travel experiences to the world's most breathtaking destinations.
            </p>
            <div className="pt-8">
              <Button size="lg" asChild className="rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-xl hover:shadow-primary/20 transition-all">
                <Link to="/packages">Explore Destinations</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.98,130.2,197.6,120.7,243.68,114.16,283.47,82.2,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Qube Travel?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">We handle every detail so you can focus on creating unforgettable memories.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Compass className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Expert Curation</h3>
              <p className="text-slate-500">Every itinerary is hand-picked by our seasoned travel experts to ensure premium quality.</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Secure & Reliable</h3>
              <p className="text-slate-500">Book with confidence knowing your payment and personal details are protected.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Personalized Care</h3>
              <p className="text-slate-500">24/7 dedicated support before, during, and after your trip.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trending Destinations</h2>
              <p className="text-slate-500 text-lg">Explore our most popular and highly-rated travel packages curated for you.</p>
            </div>
            <Button variant="outline" asChild className="rounded-full px-6">
              <Link to="/packages">View All Packages</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col group border-none shadow-md hover:shadow-xl transition-shadow rounded-2xl bg-white">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="text-white">
                        <div className="flex items-center gap-1.5 text-sm font-medium mb-1">
                          <MapPin className="h-4 w-4 text-primary" />
                          {pkg.destination}
                        </div>
                        <h3 className="text-xl font-bold line-clamp-1">{pkg.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4 text-slate-500 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{pkg.durationDays} Days</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-500 font-medium">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{pkg.rating} <span className="text-slate-400 font-normal">({pkg.reviews})</span></span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm line-clamp-2 mb-6 flex-1">
                      {pkg.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">From</p>
                        <p className="text-xl font-bold text-slate-900">${pkg.price.toLocaleString()}</p>
                      </div>
                      <Button asChild variant="default" className="rounded-full">
                        <Link to={`/packages/${pkg.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80")' }}
        />
        
        <div className="container relative z-10 text-center text-white px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-xl text-slate-300 font-light">
              Don't just dream about your perfect vacation. Let us help you plan it today.
            </p>
            <Button size="lg" asChild className="rounded-full px-10 h-14 text-lg bg-primary hover:bg-primary/90 text-white">
              <Link to="/contact">Contact an Expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
