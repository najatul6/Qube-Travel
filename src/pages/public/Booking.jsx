import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '@/lib/schemas';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { Calendar, Users, MapPin, DollarSign, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function Booking() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      travelers: 1,
    }
  });

  const travelers = watch('travelers');

  useEffect(() => {
    const data = storage.getById(storage.KEYS.PACKAGES, packageId);
    if (data) {
      setPkg(data);
    } else {
      toast.error('Package not found');
      navigate('/packages');
    }
  }, [packageId, navigate]);

  const onSubmit = async (data) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1000));
    
    const booking = storage.create(storage.KEYS.BOOKINGS, {
      packageId: pkg.id,
      packageTitle: pkg.title,
      totalPrice: pkg.price * data.travelers,
      status: 'pending',
      ...data
    });
    
    toast.success('Booking submitted successfully!');
    navigate(`/booking/confirmation/${booking.id}`);
  };

  if (!pkg) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container max-w-5xl px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Secure Your Booking</h1>
          <p className="text-slate-600 mt-2">Complete your details below to reserve your spot.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-1">
            <Card className="border-none shadow-md rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-6">
                <CardTitle className="text-xl">Traveler Information</CardTitle>
                <CardDescription className="text-slate-300">Please provide contact details for the lead traveler.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Full Name *</label>
                      <Input placeholder="John Doe" {...register('name')} className={errors.name ? 'border-red-500' : ''} />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Address *</label>
                      <Input type="email" placeholder="john@example.com" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number *</label>
                      <Input placeholder="+1234567890" {...register('phone')} className={errors.phone ? 'border-red-500' : ''} />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Number of Travelers *</label>
                      <Input type="number" min="1" max="20" {...register('travelers', { valueAsNumber: true })} className={errors.travelers ? 'border-red-500' : ''} />
                      {errors.travelers && <p className="text-red-500 text-sm">{errors.travelers.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Travel Date *</label>
                    <Input 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]} 
                      onChange={(e) => setValue('date', e.target.value ? new Date(e.target.value) : undefined)} 
                      className={errors.date ? 'border-red-500' : ''}
                    />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Special Requests (Optional)</label>
                    <textarea 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Dietary requirements, room preferences, etc."
                      {...register('specialRequests')}
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <aside className="w-full lg:w-[380px] shrink-0">
            <Card className="border border-slate-200 shadow-sm rounded-2xl sticky top-28 overflow-hidden">
              <div className="h-40 overflow-hidden relative">
                <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/20"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{pkg.title}</h3>
                
                <div className="space-y-3 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center text-slate-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                    {pkg.destination}
                  </div>
                  <div className="flex items-center text-slate-600 text-sm">
                    <Clock className="h-4 w-4 mr-2 text-slate-400" />
                    {pkg.durationDays} Days
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-slate-100 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Price per person</span>
                    <span>${pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Travelers</span>
                    <span>x {travelers || 1}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900 text-lg">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">${(pkg.price * (travelers || 1)).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
