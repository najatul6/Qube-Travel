import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { CheckCircle2 } from 'lucide-react';

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = () => {
    setInquiries(storage.getAll(storage.KEYS.INQUIRIES).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const markResolved = (id) => {
    storage.update(storage.KEYS.INQUIRIES, id, { status: 'resolved' });
    toast.success('Inquiry marked as resolved');
    loadInquiries();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Inquiries</h1>
        <p className="text-slate-500">View and respond to customer contact form messages.</p>
      </div>

      <div className="grid gap-4">
        {inquiries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-500">
            No inquiries found.
          </div>
        ) : (
          inquiries.map((inq) => (
            <Card key={inq.id} className={`border-none shadow-sm ${inq.status === 'resolved' ? 'opacity-60 bg-slate-50' : 'bg-white'}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{inq.name}</h3>
                    <p className="text-sm text-primary">{inq.email}</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(inq.createdAt).toLocaleString()}</p>
                  </div>
                  {inq.status !== 'resolved' && (
                    <Button size="sm" variant="outline" className="gap-2 text-green-600 border-green-200 hover:bg-green-50" onClick={() => markResolved(inq.id)}>
                      <CheckCircle2 className="h-4 w-4" /> Resolve
                    </Button>
                  )}
                  {inq.status === 'resolved' && (
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Resolved</span>
                  )}
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-slate-700 text-sm whitespace-pre-wrap">
                  {inq.message}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
