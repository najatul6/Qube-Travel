import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageTransition from '@/components/shared/PageTransition';
import { Input } from '@/components/ui/input';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Sort posts by date descending
    const allPosts = storage.getItems(storage.KEYS.POSTS)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setPosts(allPosts);
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <PageTransition>
      <div className="bg-muted py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Wellness Blog</h1>
        <p className="text-muted-foreground max-w-xl mx-auto px-4">
          Insights, tips, and stories about holistic health and self-care.
        </p>
      </div>

      <div className="container py-16 max-w-6xl">
        <div className="mb-12 max-w-md mx-auto">
          <Input 
            placeholder="Search articles or tags..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link to={`/blog/${post.id}`}>
                  <Card className="h-full flex flex-col group overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex gap-2 flex-wrap mb-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription>
                        {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No articles found matching "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
