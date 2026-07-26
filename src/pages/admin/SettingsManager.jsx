import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Settings, Save, Building, Mail, Phone, MapPin } from 'lucide-react';

export default function SettingsManager() {
  const [settings, setSettings] = useState({ companyName: '', email: '', phone: '', address: '' });

  useEffect(() => {
    const data = storage.getSettings() || { companyName: '', email: '', phone: '', address: '' };
    setSettings(data);
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    storage.updateSettings(settings);
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Platform Settings</h1>
          <p className="text-slate-500 font-medium">Manage your company information and global configurations.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Company Details</h2>
            <p className="text-sm text-slate-500">This information appears in the footer and contact pages.</p>
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Building className="h-4 w-4 text-slate-400" /> Company Name
              </label>
              <Input 
                name="companyName" 
                value={settings.companyName} 
                onChange={handleChange} 
                className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-primary/20 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" /> Support Email
              </label>
              <Input 
                type="email" 
                name="email" 
                value={settings.email} 
                onChange={handleChange} 
                className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-primary/20 focus:bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" /> Contact Phone
              </label>
              <Input 
                name="phone" 
                value={settings.phone} 
                onChange={handleChange} 
                className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-primary/20 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" /> Office Address
              </label>
              <Input 
                name="address" 
                value={settings.address} 
                onChange={handleChange} 
                className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-primary/20 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-8 flex justify-end border-t border-slate-100">
            <Button onClick={handleSave} className="h-12 px-8 rounded-xl bg-slate-900 hover:bg-primary text-white font-bold gap-2 shadow-lg hover:shadow-primary/30 transition-all">
              <Save className="h-5 w-5" /> Save Changes
            </Button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
