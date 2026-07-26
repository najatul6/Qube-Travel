import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { User, Save, Mail, Phone, Lock, UserCircle } from 'lucide-react';

export default function UserProfile() {
  const session = storage.getSession();
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '', currentPassword: '', newPassword: '' });

  useEffect(() => {
    if (session) {
      // Mock loading profile data
      setProfile({
        fullName: 'Demo Customer',
        email: session.email,
        phone: '+1 (555) 123-4567',
        currentPassword: '',
        newPassword: ''
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Mock save action
    toast.success('Profile updated successfully');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Profile</h1>
          <p className="text-slate-500 font-medium">Manage your personal information and security settings.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex items-center gap-6 mb-10 relative z-10">
          <div className="h-24 w-24 rounded-[2rem] bg-secondary text-white flex items-center justify-center shrink-0 shadow-lg shadow-secondary/20 relative group">
            <span className="text-3xl font-extrabold">{profile.fullName.charAt(0)}</span>
            <div className="absolute inset-0 bg-black/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <UserCircle className="h-8 w-8" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{profile.fullName}</h2>
            <p className="text-slate-500 font-medium">{profile.email}</p>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-4 border-b border-slate-100 pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" /> Full Name
                </label>
                <Input 
                  name="fullName" 
                  value={profile.fullName} 
                  onChange={handleChange} 
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-secondary/20 focus:bg-white font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" /> Email Address
                </label>
                <Input 
                  type="email" 
                  name="email" 
                  value={profile.email} 
                  onChange={handleChange}
                  disabled
                  className="h-12 bg-slate-100 border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" /> Phone Number
                </label>
                <Input 
                  name="phone" 
                  value={profile.phone} 
                  onChange={handleChange} 
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-secondary/20 focus:bg-white font-medium"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-4 border-b border-slate-100 pb-2">Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-slate-400" /> Current Password
                </label>
                <Input 
                  type="password"
                  name="currentPassword" 
                  value={profile.currentPassword} 
                  onChange={handleChange} 
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-secondary/20 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-slate-400" /> New Password
                </label>
                <Input 
                  type="password"
                  name="newPassword" 
                  value={profile.newPassword} 
                  onChange={handleChange} 
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-secondary/20 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <Button onClick={handleSave} className="h-12 px-8 rounded-xl bg-slate-900 hover:bg-secondary text-white font-bold gap-2 shadow-lg hover:shadow-secondary/30 transition-all">
              <Save className="h-5 w-5" /> Save Profile
            </Button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
