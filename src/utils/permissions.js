/**
 * Permission Definitions for VNC SOAR Dashboard
 * 
 * This file defines all permissions and role-permission mappings
 * for the Role-Based Access Control (RBAC) system.
 */

// Role Constants
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  ANALYST: 'analyst',
  VIEWER: 'viewer',
};

// Permission Constants
export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: 'view:dashboard',
  EXPORT_REPORTS: 'export:reports',
  
  // Alerts
  VIEW_ALERTS: 'view:alerts',
  MANAGE_ALERTS: 'manage:alerts',
  INVESTIGATE_ALERTS: 'investigate:alerts',
  RESOLVE_ALERTS: 'resolve:alerts',
  DISMISS_ALERTS: 'dismiss:alerts',
  DELETE_ALERTS: 'delete:alerts',
  
  // Sessions
  VIEW_SESSIONS: 'view:sessions',
  BLOCK_IPS: 'block:ips',
  TERMINATE_SESSIONS: 'terminate:sessions',
  
  // Firewall
  VIEW_FIREWALL: 'view:firewall',
  ADD_FIREWALL_RULES: 'add:firewall',
  EDIT_FIREWALL_RULES: 'edit:firewall',
  DELETE_FIREWALL_RULES: 'delete:firewall',
  TOGGLE_FIREWALL_RULES: 'toggle:firewall',
  
  // Settings
  VIEW_SETTINGS: 'view:settings',
  EDIT_PROFILE: 'edit:profile',
  CONFIGURE_ALERTS: 'configure:alerts',
  CONFIGURE_SYSTEM: 'configure:system',
  MANAGE_ALERT_CONFIG: 'manage:alert_config',
  MANAGE_NOTIFICATIONS: 'manage:notifications',
  MANAGE_INTEGRATIONS: 'manage:integrations',
  MANAGE_SYSTEM: 'manage:system',
  
  // Users
  VIEW_USERS: 'view:users',
  MANAGE_USERS: 'manage:users',
  ASSIGN_ROLES: 'assign:roles',
  
  // Audit
  VIEW_AUDIT_LOGS: 'view:audit',
  EXPORT_AUDIT_LOGS: 'export:audit',
};

// Role Permission Mappings
export const ROLE_PERMISSIONS = {
  // Super Admin - Full Access
  super_admin: Object.values(PERMISSIONS),
  
  // Admin - Management Access (no user management)
  admin: [
    // Dashboard
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.EXPORT_REPORTS,
    
    // Alerts
    PERMISSIONS.VIEW_ALERTS,
    PERMISSIONS.MANAGE_ALERTS,
    PERMISSIONS.INVESTIGATE_ALERTS,
    PERMISSIONS.RESOLVE_ALERTS,
    PERMISSIONS.DISMISS_ALERTS,
    PERMISSIONS.DELETE_ALERTS,
    
    // Sessions
    PERMISSIONS.VIEW_SESSIONS,
    PERMISSIONS.BLOCK_IPS,
    PERMISSIONS.TERMINATE_SESSIONS,
    
    // Firewall
    PERMISSIONS.VIEW_FIREWALL,
    PERMISSIONS.ADD_FIREWALL_RULES,
    PERMISSIONS.EDIT_FIREWALL_RULES,
    PERMISSIONS.DELETE_FIREWALL_RULES,
    PERMISSIONS.TOGGLE_FIREWALL_RULES,
    
    // Settings
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.CONFIGURE_ALERTS,
    PERMISSIONS.MANAGE_ALERT_CONFIG,
    PERMISSIONS.MANAGE_NOTIFICATIONS,
    PERMISSIONS.MANAGE_INTEGRATIONS,
    
    // Audit
    PERMISSIONS.VIEW_AUDIT_LOGS,
    PERMISSIONS.EXPORT_AUDIT_LOGS,
  ],
  
  // Security Analyst - Operational Access
  analyst: [
    // Dashboard
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.EXPORT_REPORTS,
    
    // Alerts
    PERMISSIONS.VIEW_ALERTS,
    PERMISSIONS.INVESTIGATE_ALERTS,
    PERMISSIONS.RESOLVE_ALERTS,
    PERMISSIONS.DISMISS_ALERTS,
    
    // Sessions
    PERMISSIONS.VIEW_SESSIONS,
    
    // Firewall
    PERMISSIONS.VIEW_FIREWALL,
    
    // Settings
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_PROFILE,
    
    // Audit
    PERMISSIONS.VIEW_AUDIT_LOGS,
  ],
  
  // Viewer - Read-Only Access
  viewer: [
    // Dashboard
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.EXPORT_REPORTS,
    
    // Alerts
    PERMISSIONS.VIEW_ALERTS,
    
    // Sessions
    PERMISSIONS.VIEW_SESSIONS,
    
    // Firewall
    PERMISSIONS.VIEW_FIREWALL,
    
    // Settings
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_PROFILE,
  ],
};

// Role Display Configuration
export const ROLE_CONFIG = {
  super_admin: {
    label: 'Super Admin',
    icon: '👑',
    color: 'from-purple-500 to-purple-700',
    description: 'Full system access including user management',
  },
  admin: {
    label: 'Admin',
    icon: '🛡️',
    color: 'from-blue-500 to-blue-700',
    description: 'Management access to all security features',
  },
  analyst: {
    label: 'Security Analyst',
    icon: '👨‍💼',
    color: 'from-teal-500 to-teal-700',
    description: 'Operational access to investigate and resolve alerts',
  },
  viewer: {
    label: 'Viewer',
    icon: '👁️',
    color: 'from-gray-500 to-gray-700',
    description: 'Read-only access to view security data',
  },
};

// Default role for new users
export const DEFAULT_ROLE = 'viewer';
