/**
 * Protected Route Component
 * 
 * Wraps routes that require authentication and/or specific permissions
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { canAccessRoute } from '../utils/rbac';

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
  const { isLoaded, isSignedIn, role } = useAuth();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0D0E1C] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  
  // Check if user has required permissions
  if (requiredPermissions.length > 0 && !canAccessRoute(role, requiredPermissions)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // User is authenticated and has required permissions
  return children;
};

export default ProtectedRoute;
