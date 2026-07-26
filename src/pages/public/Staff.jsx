import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';

export default function Staff() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    setStaff(storage.getItems(storage.KEYS.STAFF));
  }, []);

  return (
    <PageTransition>
      <div className="bg-muted py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Expert Team</h1>
        <p className="text-muted-foreground max-w-xl mx-auto px-4">
          Meet the dedicated professionals committed to your wellness journey.
        </p>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden border-none shadow-md">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-primary">{member.role}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span>{member.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{member.name}</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto">
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {member.bio}
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map(spec => (
                        <Badge key={spec} variant="secondary" className="font-normal">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
