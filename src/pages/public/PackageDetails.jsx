import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Calendar, Check, Plane, Users, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <img 
          src={pkg.imageUrl} 
          alt={pkg.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-16">
          <div className="container max-w-6xl mx-auto flex flex-col items-start gap-4">
            <Button variant="outline" size="sm" className="bg-white/10 text-white hover:bg-white hover:text-slate-900 border-white/20 mb-4" asChild>
              <Link to="/packages"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Packages</Link>
            </Button>
            
            <div className="flex flex-wrap gap-3 mb-2">
              <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/20 backdrop-blur text-sm px-3 py-1">
                {pkg.region.toUpperCase()}
              </Badge>
              {pkg.featured && (
                <Badge className="bg-amber-400/90 text-amber-950 hover:bg-amber-400 text-sm px-3 py-1">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl">
              {pkg.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mt-4 text-slate-200">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-lg">{pkg.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-lg">{pkg.durationDays} Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400 fill-current" />
                <span className="text-lg font-medium">{pkg.rating} <span className="text-slate-400">({pkg.reviews} reviews)</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                  {pkg.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mt-10 p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-3">
                      <Check className="h-5 w-5 text-green-500" /> What's Included
                    </h3>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-400" /> Premium Accommodation</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-400" /> Professional Guide</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-400" /> Ground Transportation</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-slate-400" /> Select Meals</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-3">
                      <Plane className="h-5 w-5 text-slate-400" /> Not Included
                    </h3>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-transparent" /> International Flights</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-transparent" /> Travel Insurance</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-transparent" /> Personal Expenses</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Itinerary</h2>
                <Accordion type="single" collapsible className="w-full">
                  {pkg.itinerary?.map((day, index) => (
                    <AccordionItem key={index} value={`day-${index}`} className="border-b-slate-100">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex gap-4 items-center">
                          <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-md text-sm">
                            Day {day.day}
                          </span>
                          <span className="font-semibold text-slate-800 text-lg">{day.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 text-base leading-relaxed pl-16 py-4">
                        {day.activities}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1 sticky top-28">
            <Card className="border border-primary/20 shadow-lg shadow-primary/5 rounded-2xl overflow-hidden">
              <div className="bg-slate-900 text-white p-8">
                <p className="text-primary-foreground/80 font-medium mb-1 uppercase tracking-wider text-sm">Starting from</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold">${pkg.price.toLocaleString()}</span>
                  <span className="text-slate-400 mb-1">/ person</span>
                </div>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4 text-slate-600 border-b border-slate-100 pb-4">
                  <div className="bg-slate-50 p-3 rounded-full"><Calendar className="h-5 w-5 text-primary" /></div>
                  <div>
                    <p className="font-semibold text-slate-900">Flexible Dates</p>
                    <p className="text-sm">Available year-round</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-600 border-b border-slate-100 pb-4">
                  <div className="bg-slate-50 p-3 rounded-full"><Users className="h-5 w-5 text-primary" /></div>
                  <div>
                    <p className="font-semibold text-slate-900">Group Size</p>
                    <p className="text-sm">Max 12 people</p>
                  </div>
                </div>

                <Button size="lg" className="w-full text-lg h-14 rounded-xl mt-4" asChild>
                  <Link to={`/book/${pkg.id}`}>Book This Package</Link>
                </Button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  No payment required today. Secure your spot with a reservation.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
