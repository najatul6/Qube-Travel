import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your company information.</p>
      </div>

      <Card className="max-w-2xl border-none shadow-sm">
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>This information will be displayed on the footer and contact page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Company Name</label>
            <Input name="companyName" value={settings.companyName} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Support Email</label>
            <Input type="email" name="email" value={settings.email} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Contact Phone</label>
            <Input name="phone" value={settings.phone} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Office Address</label>
            <Input name="address" value={settings.address} onChange={handleChange} />
          </div>
          <div className="pt-4">
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
