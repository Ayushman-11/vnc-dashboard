/**
 * Permission Gate Component
 * 
 * Conditionally renders children based on user permissions
 */

import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';

const PermissionGate = ({ 
  children, 
  permission, 
  permissions, 
  requireAll = false,
  fallback = null 
}) => {
  const { can, canAny, canAll, isLoaded } = usePermissions();
  
  // Show nothing while loading
  if (!isLoaded) {
    return null;
  }
  
  // Single permission check
  if (permission && !can(permission)) {
    return fallback;
  }
  
  // Multiple permissions check (any)
  if (permissions && !requireAll && !canAny(permissions)) {
    return fallback;
  }
  
  // Multiple permissions check (all)
  if (permissions && requireAll && !canAll(permissions)) {
    return fallback;
  }
  
  // User has required permissions
  return children;
};

export default PermissionGate;
