import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Calendar, Check, Plane, Users, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    const data = storage.getById(storage.KEYS.PACKAGES, id);
    if (data) {
      setPkg(data);
    } else {
      navigate('/packages');
    }
  }, [id, navigate]);

  if (!pkg) return null;

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Image */}
      <div className="relative h-[75vh] w-full mx-2 md:mx-4 mt-4 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src={pkg.imageUrl} 
          alt={pkg.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
        
        <div className="absolute top-8 left-8 z-20">
          <Button variant="ghost" size="sm" className="glass-panel text-slate-900 hover:bg-white rounded-full px-6 h-12 font-bold" asChild>
            <Link to="/packages"><ArrowLeft className="h-4 w-4 mr-2" /> Back</Link>
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-primary text-white border-none text-sm px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
                  {pkg.region}
                </Badge>
                {pkg.featured && (
                  <Badge className="bg-white text-slate-900 hover:bg-white text-sm px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
                    Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-8">
                {pkg.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 text-white/90 font-medium">
                <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-2.5 rounded-2xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-lg">{pkg.destination}</span>
                </div>
                <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-2.5 rounded-2xl">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-lg">{pkg.durationDays} Days</span>
                </div>
                <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-2.5 rounded-2xl">
                  <Star className="h-5 w-5 text-amber-400 fill-current" />
                  <span className="text-lg">{pkg.rating} <span className="text-white/60">({pkg.reviews} reviews)</span></span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-7xl mx-auto px-4 md:px-8 mt-16">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-16">
            
            <section>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Experience Overview</h2>
              <p className="text-slate-600 leading-relaxed text-xl whitespace-pre-line font-light">
                {pkg.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-12 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                    <div className="bg-green-100 p-2 rounded-xl text-green-600"><Check className="h-5 w-5" /></div> 
                    What's Included
                  </h3>
                  <ul className="space-y-4 text-slate-600 font-medium">
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /> Premium Accommodation</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /> Professional Guide</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /> Ground Transportation</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /> Select Meals</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                    <div className="bg-slate-200 p-2 rounded-xl text-slate-600"><Plane className="h-5 w-5" /></div> 
                    Not Included
                  </h3>
                  <ul className="space-y-4 text-slate-600 font-medium">
                    <li className="flex items-center gap-3"><span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs">x</span> International Flights</li>
                    <li className="flex items-center gap-3"><span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs">x</span> Travel Insurance</li>
                    <li className="flex items-center gap-3"><span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs">x</span> Personal Expenses</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Daily Itinerary</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {pkg.itinerary?.map((day, index) => (
                  <AccordionItem key={index} value={`day-${index}`} className="border-none bg-white shadow-sm rounded-3xl overflow-hidden px-2">
                    <AccordionTrigger className="text-left hover:no-underline px-6 py-6 data-[state=open]:bg-slate-50 rounded-2xl transition-all">
                      <div className="flex gap-6 items-center">
                        <span className="bg-primary/10 text-primary font-black px-4 py-2 rounded-xl text-lg min-w-[5rem] text-center">
                          Day {day.day}
                        </span>
                        <span className="font-bold text-slate-900 text-xl">{day.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 text-lg font-light leading-relaxed pl-[6.5rem] pr-8 pb-8 pt-2">
                      {day.activities}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1 sticky top-32">
            <div className="bg-white border-2 border-slate-100 shadow-2xl rounded-[3rem] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="p-10 space-y-8 relative z-10">
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-extrabold text-slate-900 tracking-tighter">${pkg.price.toLocaleString()}</span>
                    <span className="text-slate-500 font-medium text-lg">/ person</span>
                  </div>
                </div>
                
                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-slate-600">
                    <div className="bg-orange-50 p-4 rounded-2xl"><Calendar className="h-6 w-6 text-primary" /></div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg">Flexible Dates</p>
                      <p className="text-slate-500">Available year-round</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600">
                    <div className="bg-teal-50 p-4 rounded-2xl"><Users className="h-6 w-6 text-secondary" /></div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg">Group Size</p>
                      <p className="text-slate-500">Max 12 people</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <Button size="lg" className="w-full text-xl font-bold h-16 rounded-2xl bg-gradient-tropical hover:opacity-90 shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1" asChild>
                    <Link to={`/book/${pkg.id}`}>Book This Package</Link>
                  </Button>
                  <p className="text-center text-sm font-medium text-slate-400 mt-6">
                    No payment required today. Secure your spot with a reservation.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
