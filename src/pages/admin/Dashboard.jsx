import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageSearch, BookOpenCheck, MessageSquare, Users, TrendingUp, DollarSign } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome to Qube Travel admin panel. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From confirmed bookings</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
            <PackageSearch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPackages}</div>
            <p className="text-xs text-muted-foreground">Destinations available</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">Across all statuses</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInquiries}</div>
            <p className="text-xs text-muted-foreground">Customer messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentBookings.length === 0 ? (
              <p className="text-sm text-slate-500">No bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {stats.recentBookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{booking.name}</p>
                      <p className="text-xs text-slate-500">{booking.packageTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">${booking.totalPrice.toLocaleString()}</p>
                      <p className={`text-xs capitalize font-medium ${booking.status === 'confirmed' ? 'text-green-600' : booking.status === 'pending' ? 'text-amber-600' : 'text-red-600'}`}>
                        {booking.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentInquiries.length === 0 ? (
              <p className="text-sm text-slate-500">No inquiries yet.</p>
            ) : (
              <div className="space-y-4">
                {stats.recentInquiries.map(inquiry => (
                  <div key={inquiry.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{inquiry.name}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">{inquiry.message}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                      <p className={`text-xs capitalize font-medium ${inquiry.status === 'new' ? 'text-primary' : 'text-slate-500'}`}>
                        {inquiry.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
