import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { PackageSearch, BookOpenCheck, MessageSquare, DollarSign, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalBookings: 0,
    totalInquiries: 0,
    revenue: 0,
    recentBookings: [],
    recentInquiries: []
  });

  useEffect(() => {
    const packages = storage.getAll(storage.KEYS.PACKAGES);
    const bookings = storage.getAll(storage.KEYS.BOOKINGS);
    const inquiries = storage.getAll(storage.KEYS.INQUIRIES);

    const revenue = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    setStats({
      totalPackages: packages.length,
      totalBookings: bookings.length,
      totalInquiries: inquiries.length,
      revenue,
      recentBookings: bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
      recentInquiries: inquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">Total Revenue</p>
              <h3 className="text-3xl font-extrabold text-slate-900">${stats.revenue.toLocaleString()}</h3>
            </div>
            <div className="bg-orange-50 p-3 rounded-2xl text-primary">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
              <TrendingUp className="h-4 w-4" /> +12%
            </span>
            <span className="text-slate-400">vs last month</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors" />
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">Total Bookings</p>
              <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalBookings}</h3>
            </div>
            <div className="bg-teal-50 p-3 rounded-2xl text-secondary">
              <BookOpenCheck className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
             <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
              <TrendingUp className="h-4 w-4" /> +5%
            </span>
            <span className="text-slate-400">vs last month</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">Active Packages</p>
              <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalPackages}</h3>
            </div>
            <div className="bg-purple-50 p-3 rounded-2xl text-purple-600">
              <PackageSearch className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            Current live destinations
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-colors" />
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">New Inquiries</p>
              <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalInquiries}</h3>
            </div>
            <div className="bg-rose-50 p-3 rounded-2xl text-rose-500">
              <MessageSquare className="h-6 w-6" />
            </div>
          </div>
           <div className="flex items-center gap-2 text-sm text-slate-400">
            Awaiting response
          </div>
        </motion.div>

      </div>

      {/* Recent Activity */}
      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* Bookings Feed */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="flex-1 space-y-6">
            {stats.recentBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
                <BookOpenCheck className="h-12 w-12 mb-4 opacity-20" />
                <p>No bookings found.</p>
              </div>
            ) : (
              stats.recentBookings.map((booking, idx) => (
                <div key={booking.id} className="group relative pl-10">
                  {/* Timeline line */}
                  {idx !== stats.recentBookings.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-[-24px] w-0.5 bg-slate-100 group-hover:bg-primary/30 transition-colors" />
                  )}
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-slate-50 border-2 border-white shadow-sm flex items-center justify-center z-10 group-hover:bg-primary group-hover:text-white transition-colors text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                  </div>
                  
                  <div className="bg-slate-50 hover:bg-slate-100/50 p-4 rounded-2xl transition-colors border border-transparent hover:border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-slate-900">{booking.name}</p>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-slate-500 font-medium">{booking.packageTitle}</p>
                      <p className="font-extrabold text-slate-900">${booking.totalPrice?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Inquiries Feed */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="text-secondary font-bold text-sm hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="flex-1 space-y-6">
            {stats.recentInquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
                <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                <p>No inquiries found.</p>
              </div>
            ) : (
              stats.recentInquiries.map((inquiry, idx) => (
                <div key={inquiry.id} className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0 shadow-inner">
                    {inquiry.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0 bg-slate-50 p-4 rounded-2xl hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-slate-900 truncate">{inquiry.name}</p>
                      <span className="text-xs font-medium text-slate-400 whitespace-nowrap ml-2">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">{inquiry.message}</p>
                    <div className="mt-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${inquiry.status === 'new' ? 'bg-secondary/10 text-secondary' : 'bg-slate-200 text-slate-500'}`}>
                        {inquiry.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
