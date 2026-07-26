import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';

export default function BookingsManager() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    setBookings(storage.getAll(storage.KEYS.BOOKINGS).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const handleStatusChange = (id, newStatus) => {
    storage.update(storage.KEYS.BOOKINGS, id, { status: newStatus });
    toast.success(`Booking marked as ${newStatus}`);
    loadBookings();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Bookings</h1>
        <p className="text-slate-500">View and update customer booking requests.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3">Booking Ref</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-slate-50">
                      <td className="px-4 py-4 font-mono text-xs text-slate-500">
                        #{booking.id.substring(0, 8)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900">{booking.name}</div>
                        <div className="text-xs text-slate-500">{booking.email}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-700">{booking.packageTitle}</td>
                      <td className="px-4 py-4 font-semibold">${booking.totalPrice?.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <Badge 
                          variant="outline" 
                          className={`capitalize ${
                            booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' : 
                            booking.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                            'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Select 
                          value={booking.status} 
                          onValueChange={(val) => handleStatusChange(booking.id, val)}
                        >
                          <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
