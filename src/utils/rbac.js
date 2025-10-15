/**
 * RBAC Helper Functions
 * 
 * Utility functions for checking permissions and role-based access
 */

import { ROLE_PERMISSIONS } from './permissions';

/**
 * Check if a user role has a specific permission
 */
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
};

/**
 * Check if a user role has any of the specified permissions
 */
export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.some(permission => hasPermission(userRole, permission));
};

/**
 * Check if a user role has all of the specified permissions
 */
export const hasAllPermissions = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.every(permission => hasPermission(userRole, permission));
};

/**
 * Check if a user can access a route based on required permissions
 */
export const canAccessRoute = (userRole, requiredPermissions) => {
  // If no permissions required, allow access
  if (!requiredPermissions || requiredPermissions.length === 0) return true;
  
  // Check if user has any of the required permissions
  return hasAnyPermission(userRole, requiredPermissions);
};

/**
 * Get all permissions for a specific role
 */
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

/**
 * Check if a role is admin level (admin or super_admin)
 */
export const isAdminRole = (role) => {
  return role === 'admin' || role === 'super_admin';
};

/**
 * Check if a role is super admin
 */
export const isSuperAdminRole = (role) => {
  return role === 'super_admin';
};

/**
 * Compare role hierarchy (higher number = more permissions)
 */
const ROLE_HIERARCHY = {
  viewer: 1,
  analyst: 2,
  admin: 3,
  super_admin: 4,
};

export const getRoleLevel = (role) => {
  return ROLE_HIERARCHY[role] || 0;
};

export const hasHigherRole = (userRole, comparisonRole) => {
  return getRoleLevel(userRole) > getRoleLevel(comparisonRole);
};

export const hasEqualOrHigherRole = (userRole, comparisonRole) => {
  return getRoleLevel(userRole) >= getRoleLevel(comparisonRole);
};
