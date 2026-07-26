import { useState, useEffect } from 'react';
import { storage, updateItem } from '@/lib/storage';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [viewingMessage, setViewingMessage] = useState(null);

  useEffect(() => {
    const allMessages = storage.getItems(storage.KEYS.MESSAGES)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setMessages(allMessages);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = updateItem(storage.KEYS.MESSAGES, id, { status: newStatus });
    if (updated) {
      setMessages(messages.map(m => m.id === id ? updated : m));
      toast.success(`Message marked as ${newStatus}`);
    }
  };

  const handleViewMessage = (msg) => {
    setViewingMessage(msg);
    if (msg.status === 'New') {
      handleStatusChange(msg.id, 'Read');
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'New': return 'default';
      case 'Read': return 'outline';
      case 'Archived': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Contact Messages</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Messages from the contact form.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.length > 0 ? (
                  messages.map(msg => (
                    <TableRow key={msg.id} className={msg.status === 'New' ? 'bg-muted/30 font-medium' : ''}>
                      <TableCell>{format(new Date(msg.createdAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <div>{msg.name}</div>
                        <div className="text-xs text-muted-foreground">{msg.email}</div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{msg.subject}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(msg.status)}>
                          {msg.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewMessage(msg)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Select 
                            defaultValue={msg.status} 
                            onValueChange={(val) => handleStatusChange(msg.id, val)}
                          >
                            <SelectTrigger className="w-[110px] h-8 text-xs">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="Read">Read</SelectItem>
                              <SelectItem value="Archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No messages found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!viewingMessage} onOpenChange={(open) => !open && setViewingMessage(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{viewingMessage?.subject}</DialogTitle>
            <DialogDescription>
              From: {viewingMessage?.name} ({viewingMessage?.email})
              <br/>
              Date: {viewingMessage ? format(new Date(viewingMessage.createdAt), 'MMM d, yyyy h:mm a') : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-muted/30 rounded-md whitespace-pre-wrap text-sm leading-relaxed max-h-[400px] overflow-y-auto">
            {viewingMessage?.message}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
