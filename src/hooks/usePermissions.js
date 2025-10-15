/**
 * usePermissions Hook
 * 
 * Custom hook to check user permissions
 */

import { useAuth } from './useAuth';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '../utils/rbac';

export const usePermissions = () => {
  const { role, isLoaded } = useAuth();
  
  return {
    /**
     * Check if user has a specific permission
     * @param {string} permission - Permission to check
     * @returns {boolean}
     */
    can: (permission) => {
      if (!isLoaded) return false;
      return hasPermission(role, permission);
    },
    
    /**
     * Check if user has any of the specified permissions
     * @param {string[]} permissions - Array of permissions to check
     * @returns {boolean}
     */
    canAny: (permissions) => {
      if (!isLoaded) return false;
      return hasAnyPermission(role, permissions);
    },
    
    /**
     * Check if user has all of the specified permissions
     * @param {string[]} permissions - Array of permissions to check
     * @returns {boolean}
     */
    canAll: (permissions) => {
      if (!isLoaded) return false;
      return hasAllPermissions(role, permissions);
    },
    
    /**
     * Check if user does NOT have a permission
     * @param {string} permission - Permission to check
     * @returns {boolean}
     */
    cannot: (permission) => {
      if (!isLoaded) return true;
      return !hasPermission(role, permission);
    },
    
    // Loading state
    isLoaded,
  };
};
