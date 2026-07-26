import { Navigate, useLocation } from 'react-router-dom';
import { storage } from '@/lib/storage';

export default function ProtectedRoute({ children }) {
  const session = storage.getSession();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
