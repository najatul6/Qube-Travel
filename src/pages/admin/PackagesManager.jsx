import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function PackagesManager() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = () => {
    setPackages(storage.getAll(storage.KEYS.PACKAGES));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      storage.remove(storage.KEYS.PACKAGES, id);
      toast.success('Package deleted');
      loadPackages();
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Manage Packages</h1>
          <p className="text-slate-500 font-medium">Create, edit, and manage travel destinations.</p>
        </div>
        <Button className="gap-2 rounded-xl h-12 px-6 bg-slate-900 text-white hover:bg-primary shadow-lg hover:shadow-primary/30 transition-all font-bold">
          <Plus className="h-5 w-5" /> Add Package
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        
        {/* Table Header / Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search packages..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
          <Button variant="outline" className="w-full md:w-auto gap-2 rounded-xl h-11 border-slate-200 text-slate-700 font-bold hover:bg-slate-50">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-sm text-left">
            <thead className="text-xs font-extrabold tracking-wider text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Package Details</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <PackageSearch className="h-8 w-8 text-slate-300" />
                      </div>
                      <p className="font-medium text-lg">No packages found.</p>
                      <p className="text-sm">Click 'Add Package' to create one.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 rounded-xl overflow-hidden shrink-0">
                          <img src={pkg.imageUrl} alt={pkg.title} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{pkg.title}</p>
                          <p className="text-xs text-slate-500 font-medium">{pkg.durationDays} Days</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg text-xs">{pkg.destination}</span>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">${pkg.price?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {pkg.featured ? (
                        <span className="bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Featured</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-500 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Standard</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700" onClick={() => handleDelete(pkg.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
