import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Printer, ArrowRight, Download } from 'lucide-react';

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const data = storage.getById(storage.KEYS.BOOKINGS, bookingId);
    if (data) {
      setBooking(data);
    }
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">Booking not found.</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 print:bg-white print:pt-8">
      <div className="container max-w-3xl px-4 md:px-6">
        
        <div className="text-center mb-10 print:hidden">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Booking Confirmed!</h1>
          <p className="text-lg text-slate-600">
            Thank you, {booking.name}. Your booking for <span className="font-semibold text-slate-800">{booking.packageTitle}</span> has been received.
          </p>
        </div>

        {/* Printable Area */}
        <Card className="border-slate-200 shadow-md rounded-2xl overflow-hidden print:shadow-none print:border-none">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center print:bg-white print:text-black print:border-b">
            <div>
              <h2 className="text-2xl font-bold mb-1">Booking Summary</h2>
              <p className="text-slate-400 print:text-slate-600">Reference: #{booking.id.substring(0, 8).toUpperCase()}</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm text-slate-400 print:text-slate-600">Date</p>
              <p className="font-medium">{new Date(booking.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <CardContent className="p-8">
            
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Traveler Details</h3>
                <div className="space-y-2">
                  <p className="text-slate-900 font-medium">{booking.name}</p>
                  <p className="text-slate-600">{booking.email}</p>
                  <p className="text-slate-600">{booking.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Trip Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination</span>
                    <span className="font-medium text-slate-900">{booking.packageTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Travel Date</span>
                    <span className="font-medium text-slate-900">{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Travelers</span>
                    <span className="font-medium text-slate-900">{booking.travelers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status</span>
                    <span className="font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded capitalize text-sm">{booking.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {booking.specialRequests && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Special Requests</h3>
                <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">{booking.specialRequests}</p>
              </div>
            )}

            <div className="border-t border-slate-200 pt-6 mt-8 flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-700">Total Amount Paid</span>
              <span className="text-3xl font-bold text-primary">${booking.totalPrice.toLocaleString()}</span>
            </div>

          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <Button variant="outline" size="lg" className="gap-2" onClick={handlePrint}>
            <Printer className="h-4 w-4" /> Print Summary
          </Button>
          <Button size="lg" className="gap-2" asChild>
            <Link to="/packages">
              Explore More <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
