import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/schemas';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const settings = storage.getSettings() || {};

  const onSubmit = async (data) => {
    // Simulate delay
    await new Promise(r => setTimeout(r, 800));
    storage.create(storage.KEYS.INQUIRIES, { ...data, status: 'new' });
    toast.success('Your message has been sent successfully. We will get back to you soon!');
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container max-w-6xl px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600">
            Have a question about a package? Need a custom itinerary? Our travel experts are here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">Office</h3>
                  <p className="text-slate-600">{settings.address || '123 Explorer Way, WL 90210'}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">Phone</h3>
                  <p className="text-slate-600">{settings.phone || '+1 (555) 123-4567'}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">Email</h3>
                  <p className="text-slate-600">{settings.email || 'hello@qubetravel.com'}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">Business Hours</h3>
                  <p className="text-slate-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-slate-600">Sat - Sun: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-md rounded-2xl h-full">
              <CardContent className="p-8 md:p-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Your Name *</label>
                      <Input placeholder="John Doe" {...register('name')} className={errors.name ? 'border-red-500' : ''} />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Address *</label>
                      <Input type="email" placeholder="john@example.com" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Message *</label>
                    <Textarea 
                      placeholder="How can we help you plan your next trip?" 
                      className={`min-h-[150px] resize-y ${errors.message ? 'border-red-500' : ''}`}
                      {...register('message')} 
                    />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto h-12 px-8" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
