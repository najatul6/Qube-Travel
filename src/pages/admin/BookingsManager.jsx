import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, BookOpenCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Manage Bookings</h1>
          <p className="text-slate-500 font-medium">Review and process customer travel reservations.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        
        {/* Table Header / Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search bookings by name or ID..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
          <Button variant="outline" className="w-full md:w-auto gap-2 rounded-xl h-11 border-slate-200 text-slate-700 font-bold hover:bg-slate-50">
            <Filter className="h-4 w-4" /> Filter Status
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-sm text-left">
            <thead className="text-xs font-extrabold tracking-wider text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Booking Ref</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <BookOpenCheck className="h-8 w-8 text-slate-300" />
                      </div>
                      <p className="font-medium text-lg">No bookings found.</p>
                      <p className="text-sm">Wait for customers to submit reservations.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5 font-mono text-xs font-bold text-slate-400">
                      #{booking.id.substring(0, 8)}
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{booking.name}</div>
                      <div className="text-xs text-slate-500 font-medium mt-1">{booking.email}</div>
                    </td>
                    <td className="px-6 py-5 font-medium text-slate-700">{booking.packageTitle}</td>
                    <td className="px-6 py-5 font-extrabold text-slate-900">${booking.totalPrice?.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="inline-block relative opacity-0 group-hover:opacity-100 transition-opacity">
                        <Select 
                          value={booking.status} 
                          onValueChange={(val) => handleStatusChange(booking.id, val)}
                        >
                          <SelectTrigger className="w-[140px] h-9 text-xs font-bold bg-white border-slate-200 rounded-xl">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                            <SelectItem value="pending" className="text-amber-700 font-bold focus:bg-amber-50">Pending</SelectItem>
                            <SelectItem value="confirmed" className="text-emerald-700 font-bold focus:bg-emerald-50">Confirmed</SelectItem>
                            <SelectItem value="cancelled" className="text-rose-700 font-bold focus:bg-rose-50">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
