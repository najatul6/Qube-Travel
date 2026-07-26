import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/schemas';
import { storage } from '@/lib/storage';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { PlaneTakeoff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));

    const session = storage.login(data.email, data.password);
    if (session) {
      toast.success('Logged in successfully');
      navigate(from, { replace: true });
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      
      <div className="mb-8 flex items-center gap-2">
        <div className="bg-primary text-primary-foreground p-2 rounded-xl">
          <PlaneTakeoff className="h-8 w-8" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-slate-900">Qube Travel</span>
      </div>

      <Card className="w-full max-w-md border-none shadow-xl rounded-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <Input 
                type="email" 
                placeholder="admin@qubetravel.com" 
                {...register('email')} 
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Password</label>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                {...register('password')} 
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full h-11 text-base mt-2" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            <p>For testing, use:</p>
            <p className="font-mono mt-1 text-xs">admin@qubetravel.com / password123</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <Button variant="link" className="text-slate-500" onClick={() => navigate('/')}>
          &larr; Back to Home
        </Button>
      </div>
    </div>
  );
}
