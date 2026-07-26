import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageTransition from '@/components/shared/PageTransition';
import { Clock, DollarSign, ArrowLeft } from 'lucide-react';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    const item = storage.getItem(storage.KEYS.SERVICES, id);
    if (item) {
      setService(item);
    } else {
      // Handle not found
      navigate('/services', { replace: true });
    }
  }, [id, navigate]);

  if (!service) return null;

  return (
    <PageTransition>
      <div className="container py-8">
        <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent">
          <Link to="/services">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg"
          >
            <img 
              src={service.imageUrl} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge>{service.category}</Badge>
                {service.featured && <Badge variant="secondary">Featured</Badge>}
              </div>
              <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl text-muted-foreground">{service.shortDescription}</p>
            </div>

            <div className="flex gap-8 py-6 border-y">
              <div className="flex items-center gap-3 text-lg">
                <Clock className="h-6 w-6 text-primary" />
                <span><span className="font-semibold">{service.durationMin}</span> minutes</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <DollarSign className="h-6 w-6 text-primary" />
                <span><span className="font-semibold">${service.price}</span></span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">About This Treatment</h3>
              <div className="prose text-muted-foreground">
                <p>{service.description}</p>
              </div>
            </div>

            <div className="pt-4">
              <Button size="lg" className="w-full sm:w-auto px-8" asChild>
                <Link to={`/book?service=${service.id}`}>Book This Service</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
