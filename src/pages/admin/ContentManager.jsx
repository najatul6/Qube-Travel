import { useState, useEffect } from 'react';
import { storage, deleteItem } from '@/lib/storage';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function ContentManager() {
  const [data, setData] = useState({
    services: [],
    staff: [],
    posts: [],
    testimonials: []
  });

  const loadData = () => {
    setData({
      services: storage.getItems(storage.KEYS.SERVICES),
      staff: storage.getItems(storage.KEYS.STAFF),
      posts: storage.getItems(storage.KEYS.POSTS),
      testimonials: storage.getItems(storage.KEYS.TESTIMONIALS)
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (key, id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      if (deleteItem(key, id)) {
        toast.success(`Deleted successfully`);
        loadData();
      }
    }
  };

  const renderTable = (items, key, columns) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(col => <TableHead key={col.key}>{col.label}</TableHead>)}
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length > 0 ? (
            items.map(item => (
              <TableRow key={item.id}>
                {columns.map(col => (
                  <TableCell key={col.key} className={col.className}>
                    {col.render ? col.render(item) : item[col.key]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(key, item.id, item.title || item.name)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                No items found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Content Manager</h2>
        <Button onClick={() => toast.info('Create functionality would open a Dialog in a full app.')}>
          Add New Item
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="posts">Blog Posts</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services">
              {renderTable(data.services, storage.KEYS.SERVICES, [
                { key: 'title', label: 'Title', className: 'font-medium' },
                { key: 'category', label: 'Category' },
                { key: 'price', label: 'Price', render: (s) => `$${s.price}` },
                { key: 'durationMin', label: 'Duration', render: (s) => `${s.durationMin}m` }
              ])}
            </TabsContent>
            
            <TabsContent value="staff">
              {renderTable(data.staff, storage.KEYS.STAFF, [
                { key: 'name', label: 'Name', className: 'font-medium' },
                { key: 'role', label: 'Role' },
                { key: 'rating', label: 'Rating', render: (s) => s.rating.toFixed(1) }
              ])}
            </TabsContent>
            
            <TabsContent value="posts">
              {renderTable(data.posts, storage.KEYS.POSTS, [
                { key: 'title', label: 'Title', className: 'font-medium' },
                { key: 'slug', label: 'Slug' },
                { key: 'createdAt', label: 'Date', render: (p) => new Date(p.createdAt).toLocaleDateString() }
              ])}
            </TabsContent>

            <TabsContent value="testimonials">
              {renderTable(data.testimonials, storage.KEYS.TESTIMONIALS, [
                { key: 'name', label: 'Client', className: 'font-medium' },
                { key: 'rating', label: 'Rating', render: (t) => `${t.rating}/5` },
                { key: 'text', label: 'Review', className: 'max-w-[300px] truncate' }
              ])}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
