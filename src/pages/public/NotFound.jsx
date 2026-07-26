import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/shared/PageTransition';

export default function NotFound() {
  return (
    <PageTransition className="flex-1 flex items-center justify-center py-24">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Button size="lg" asChild className="mt-8">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </PageTransition>
  );
}
