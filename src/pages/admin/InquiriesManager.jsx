import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';
import { Search, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = () => {
    setInquiries(storage.getAll(storage.KEYS.INQUIRIES).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const handleStatusChange = (id, newStatus) => {
    storage.update(storage.KEYS.INQUIRIES, id, { status: newStatus });
    toast.success(`Inquiry marked as ${newStatus}`);
    loadInquiries();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'replied': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'archived': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Manage Inquiries</h1>
          <p className="text-slate-500 font-medium">Respond to contact form submissions and customer questions.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        
        {/* Table Header / Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-sm text-left">
            <thead className="text-xs font-extrabold tracking-wider text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4 w-2/5">Message</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="h-8 w-8 text-slate-300" />
                      </div>
                      <p className="font-medium text-lg">No inquiries found.</p>
                      <p className="text-sm">Wait for customers to contact you.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5 whitespace-nowrap text-slate-500 font-medium">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{inquiry.name}</div>
                      <div className="text-xs text-slate-500 font-medium mt-1">{inquiry.email}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50 text-slate-600 line-clamp-2 hover:line-clamp-none transition-all">
                        {inquiry.message}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status || 'new'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right whitespace-nowrap">
                       <div className="inline-block relative opacity-0 group-hover:opacity-100 transition-opacity">
                        <Select 
                          value={inquiry.status || 'new'} 
                          onValueChange={(val) => handleStatusChange(inquiry.id, val)}
                        >
                          <SelectTrigger className="w-[140px] h-9 text-xs font-bold bg-white border-slate-200 rounded-xl">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                            <SelectItem value="new" className="text-secondary font-bold focus:bg-secondary/10">New</SelectItem>
                            <SelectItem value="replied" className="text-emerald-700 font-bold focus:bg-emerald-50">Replied</SelectItem>
                            <SelectItem value="archived" className="text-slate-600 font-bold focus:bg-slate-50">Archived</SelectItem>
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
