import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Packages</h1>
          <p className="text-slate-500">Create, edit, and manage travel destinations.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Package
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>All Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3">Package Name</th>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                      No packages found.
                    </td>
                  </tr>
                ) : (
                  packages.map((pkg) => (
                    <tr key={pkg.id} className="border-b hover:bg-slate-50">
                      <td className="px-4 py-4 font-medium text-slate-900">
                        {pkg.title}
                      </td>
                      <td className="px-4 py-4 text-slate-500">{pkg.destination}</td>
                      <td className="px-4 py-4 font-semibold">${pkg.price}</td>
                      <td className="px-4 py-4">
                        {pkg.featured ? (
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Featured</Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-500">Standard</Badge>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right space-x-2">
                        <Button variant="ghost" size="icon" className="text-blue-600">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(pkg.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
