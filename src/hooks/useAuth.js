/**
 * useAuth Hook
 * 
 * Custom hook to access authentication state and user information
 */

import { useUser } from '@clerk/clerk-react';
import { DEFAULT_ROLE } from '../utils/permissions';

export const useAuth = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  
  // Get role from user metadata (set in Clerk dashboard)
  const role = user?.publicMetadata?.role || DEFAULT_ROLE;
  
  // Helper flags
  const isAdmin = role === 'admin' || role === 'super_admin';
  const isSuperAdmin = role === 'super_admin';
  const isAnalyst = role === 'analyst';
  const isViewer = role === 'viewer';
  
  // User information
  const email = user?.emailAddresses?.[0]?.emailAddress || '';
  const name = user?.fullName || user?.firstName || 'User';
  const userId = user?.id || '';
  
  return {
    // User object
    user,
    
    // Loading states
    isLoaded,
    isSignedIn,
    
    // Role information
    role,
    isAdmin,
    isSuperAdmin,
    isAnalyst,
    isViewer,
    
    // User details
    email,
    name,
    userId,
    
    // Full metadata
    publicMetadata: user?.publicMetadata || {},
    privateMetadata: user?.privateMetadata || {},
  };
};
