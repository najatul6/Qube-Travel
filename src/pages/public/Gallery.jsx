import { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1000&q=80',
    'https://images.unsplash.com/photo-1519824145371-29681f08e367?w=1000&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1000&q=80',
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1000&q=80',
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1000&q=80',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1000&q=80',
    'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=1000&q=80',
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1000&q=80',
    'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=1000&q=80'
  ];

  return (
    <PageTransition>
      <div className="bg-muted py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-muted-foreground max-w-xl mx-auto px-4">
          Take a visual tour of our luxurious facilities and treatment rooms.
        </p>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="aspect-square cursor-pointer overflow-hidden rounded-lg group"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`Gallery image ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-1 bg-transparent border-none shadow-none">
          {selectedImage && (
            <img src={selectedImage} alt="Enlarged gallery view" className="w-full h-auto rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
