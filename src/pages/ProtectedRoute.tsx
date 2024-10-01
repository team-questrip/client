import { ReactNode } from 'react';
import { useUserStore } from '../store/user';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useUserStore((state) => state.user);
  if (!user) {
    return <Navigate to={'/welcome'} replace />;
  }

  return children;
};

export default ProtectedRoute;
