import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PageTransition from '@/components/shared/PageTransition';

export default function Services() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  useEffect(() => {
    setServices(storage.getItems(storage.KEYS.SERVICES));
  }, []);

  const categories = ['All', ...new Set(services.map(s => s.category))];
  
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      <div className="bg-muted py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-muted-foreground max-w-xl mx-auto px-4">
          Explore our extensive range of treatments designed to relax your body and soothe your soul.
        </p>
      </div>

      <div className="container py-12">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map(category => (
              <Button 
                key={category} 
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="w-full md:w-72">
            <Input 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="h-full flex flex-col group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                      ${service.price}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-primary">{service.category}</span>
                      <span className="text-sm text-muted-foreground">{service.durationMin} min</span>
                    </div>
                    <CardTitle className="text-xl mb-1">{service.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{service.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-4 border-t">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/services/${service.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No services found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
