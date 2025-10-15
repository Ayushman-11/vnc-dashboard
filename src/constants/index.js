// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
export const WS_URL = process.env.REACT_APP_WS_URL || 'http://localhost:3002';

// Alert Severity Levels
export const ALERT_SEVERITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

// Alert Status
export const ALERT_STATUS = {
  OPEN: 'Open',
  IN_PROGRESS: 'InProgress',
  DISMISSED: 'Dismissed',
  RESOLVED: 'Resolved',
};

// Session Status
export const SESSION_STATUS = {
  ACTIVE: 'Active',
  IDLE: 'Idle',
  TERMINATED: 'Terminated',
  SUSPICIOUS: 'Suspicious',
};

// Firewall Rule Status
export const FIREWALL_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  FAILED: 'Failed',
};

// Alert Types
export const ALERT_TYPES = {
  LARGE_UPLOAD: 'Large Upload',
  UNUSUAL_PORT: 'Unusual Port Access',
  ANOMALOUS_USER_AGENT: 'Anomalous User Agent',
  SUSPICIOUS_TRANSFER: 'Suspicious Transfer',
  UNAUTHORIZED_ACCESS: 'Unauthorized Access',
  BRUTE_FORCE: 'Brute Force Attempt',
  DATA_EXFILTRATION: 'Data Exfiltration',
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#8884d8',
  SECONDARY: '#C445C4',
  TERTIARY: '#FF8042',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Time Formats
export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm:ss';

// Risk Score Thresholds
export const RISK_THRESHOLDS = {
  LOW: 3.0,
  MEDIUM: 6.0,
  HIGH: 8.0,
  CRITICAL: 9.0,
};

// WebSocket Events
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  NEW_ALERT: 'new_alert',
  SESSION_UPDATE: 'session_update',
  FIREWALL_UPDATE: 'firewall_update',
  METRICS_UPDATE: 'metrics_update',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'soar_auth_token',
  USER_PREFERENCES: 'soar_user_preferences',
};
