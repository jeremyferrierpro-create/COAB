import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    // Non connecté : redirection vers le login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Connecté mais rôle insuffisant : redirection "Smart Auth" vers son espace dédié
    switch (user.role) {
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      case 'VOLUNTEER':
        return <Navigate to="/volunteer" replace />;
      case 'SENIOR':
        return <Navigate to="/senior" replace />;
      case 'JUNIOR':
        return <Navigate to="/junior" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Tout est bon, on affiche la route enfant
  return <Outlet />;
};
