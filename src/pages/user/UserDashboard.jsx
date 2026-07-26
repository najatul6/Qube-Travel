import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Link } from 'react-router-dom';
import { Ticket, Heart, Globe, Calendar, ArrowRight, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserDashboard() {
  const session = storage.getSession();
  const [stats, setStats] = useState({
    totalTrips: 0,
    upcomingTrips: 0,
    savedTrips: 0,
    recentBookings: []
  });

  useEffect(() => {
    if (!session) return;
    
    // In a real app, backend would filter this. For now, filter by email.
    const allBookings = storage.getAll(storage.KEYS.BOOKINGS);
    const userBookings = allBookings.filter(b => b.email === session.email);
    
    const upcoming = userBookings.filter(b => b.status === 'confirmed');

    setStats({
      totalTrips: userBookings.length,
      upcomingTrips: upcoming.length,
      savedTrips: 0, // Mock saved trips
      recentBookings: userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
    });
  }, [session]);

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
      
      {/* Welcome Banner */}
      <div className="bg-gradient-tropical rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ready for your next adventure?</h2>
            <p className="text-white/80 font-medium text-lg max-w-xl">You have {stats.upcomingTrips} upcoming trips confirmed. Let's make some unforgettable memories.</p>
          </div>
          <div className="hidden md:block">
            <Plane className="h-32 w-32 text-white/20 -rotate-12 animate-float" />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">Total Trips</p>
              <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalTrips}</h3>
            </div>
            <div className="bg-orange-50 p-3 rounded-2xl text-primary group-hover:scale-110 transition-transform">
              <Globe className="h-6 w-6" />
            </div>
          </div>
          <p className="text-sm text-slate-400">Past and present bookings</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">Upcoming</p>
              <h3 className="text-3xl font-extrabold text-slate-900">{stats.upcomingTrips}</h3>
            </div>
            <div className="bg-teal-50 p-3 rounded-2xl text-secondary group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
          <p className="text-sm text-slate-400">Confirmed future trips</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">Saved Packages</p>
              <h3 className="text-3xl font-extrabold text-slate-900">{stats.savedTrips}</h3>
            </div>
            <div className="bg-rose-50 p-3 rounded-2xl text-rose-500 group-hover:scale-110 transition-transform">
              <Heart className="h-6 w-6" />
            </div>
          </div>
          <p className="text-sm text-slate-400">Your wishlist</p>
        </motion.div>
      </div>

      {/* Recent Bookings Feed */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900">Recent Bookings</h2>
          <Link to="/dashboard/bookings" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {stats.recentBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-slate-400 py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Ticket className="h-12 w-12 mb-4 text-slate-300" />
              <p className="font-bold text-slate-600">No bookings yet</p>
              <p className="text-sm">When you book a trip, it will show up here.</p>
              <Link to="/packages" className="mt-4 text-primary font-bold hover:underline">Explore Packages</Link>
            </div>
          ) : (
            stats.recentBookings.map((booking) => (
              <div key={booking.id} className="bg-slate-50 hover:bg-white p-5 rounded-2xl transition-all border border-transparent hover:border-slate-200 hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Ticket className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{booking.packageTitle}</h4>
                    <p className="text-sm text-slate-500 font-medium">Ref: #{booking.id.substring(0, 8)} • Booked {new Date(booking.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-between md:justify-end">
                  <p className="font-extrabold text-slate-900">${booking.totalPrice?.toLocaleString()}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
