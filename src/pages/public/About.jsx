import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaneTakeoff, Globe2, ShieldCheck, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80" 
            alt="Airplane wing" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Redefining Modern Travel</h1>
            <p className="text-lg md:text-xl text-slate-300">
              Since 2010, Qube Travel has been crafting extraordinary journeys for the modern explorer. We believe that travel is not just about the destination, but the perspective it brings.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Our Story</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                What started as a small boutique agency in New York has grown into a global travel concierge. Our founders, avid travelers themselves, grew frustrated with the cookie-cutter itineraries offered by traditional agencies.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                They envisioned a service that combined the personalization of independent travel with the security and luxury of high-end tour operators. Thus, Qube Travel was born.
              </p>
              <Button className="mt-4" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
                alt="Our team" 
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">The principles that guide everything we do.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Globe2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Global Expertise</h3>
                <p className="text-slate-500 text-sm">Local knowledge in over 50 destinations worldwide.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Trust & Security</h3>
                <p className="text-slate-500 text-sm">Your safety and investment are always our top priority.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold">Personalization</h3>
                <p className="text-slate-500 text-sm">We listen to your needs and craft tailored experiences.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Excellence</h3>
                <p className="text-slate-500 text-sm">Award-winning service from start to finish.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
