import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/shared/PageTransition';
import { ArrowLeft } from 'lucide-react';

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const item = storage.getItem(storage.KEYS.POSTS, id);
    if (item) {
      setPost(item);
    } else {
      navigate('/blog', { replace: true });
    }
  }, [id, navigate]);

  if (!post) return null;

  return (
    <PageTransition>
      <div className="container py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
        
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Published on {format(new Date(post.createdAt), 'MMMM d, yyyy')}
          </p>
          
          <div className="rounded-2xl overflow-hidden aspect-[21/9] mb-12 shadow-lg">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary">
            {/* Simple rich text rendering. In a real app with markdown, we'd use a markdown parser */}
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-foreground/90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.article>
      </div>
    </PageTransition>
  );
}
