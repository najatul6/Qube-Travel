import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  serviceId: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  notes: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// Admin CMS Schemas
export const serviceSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.string().min(2, 'Category is required'),
  shortDescription: z.string().min(10, 'Short description is required'),
  description: z.string().min(20, 'Description is required'),
  durationMin: z.coerce.number().min(15, 'Duration must be at least 15 min'),
  price: z.coerce.number().min(0, 'Price must be valid'),
  tags: z.string().transform(str => str.split(',').map(s => s.trim())),
  imageUrl: z.string().url('Must be a valid URL'),
  featured: z.boolean().default(false),
});

export const staffSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.string().min(2, 'Role is required'),
  bio: z.string().min(10, 'Bio is required'),
  specialties: z.string().transform(str => str.split(',').map(s => s.trim())),
  imageUrl: z.string().url('Must be a valid URL'),
  rating: z.coerce.number().min(1).max(5),
});

export const postSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.string().min(20, 'Content is required'),
  tags: z.string().transform(str => str.split(',').map(s => s.trim())),
  coverImage: z.string().url('Must be a valid URL'),
});

export const testimonialSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  text: z.string().min(10, 'Text is required'),
  rating: z.coerce.number().min(1).max(5),
});
