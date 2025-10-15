import { ALERT_SEVERITY, RISK_THRESHOLDS } from '../constants';

// Format bytes to human readable format
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Format number with commas
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};

// Get severity color class
export const getSeverityColor = (severity) => {
  switch (severity) {
    case ALERT_SEVERITY.CRITICAL:
      return 'text-red-500 bg-red-500/10';
    case ALERT_SEVERITY.HIGH:
      return 'text-orange-500 bg-orange-500/10';
    case ALERT_SEVERITY.MEDIUM:
      return 'text-yellow-500 bg-yellow-500/10';
    case ALERT_SEVERITY.LOW:
      return 'text-blue-500 bg-blue-500/10';
    default:
      return 'text-gray-500 bg-gray-500/10';
  }
};

// Get risk score color
export const getRiskScoreColor = (score) => {
  if (score >= RISK_THRESHOLDS.CRITICAL) {
    return 'text-red-500';
  } else if (score >= RISK_THRESHOLDS.HIGH) {
    return 'text-orange-500';
  } else if (score >= RISK_THRESHOLDS.MEDIUM) {
    return 'text-yellow-500';
  } else {
    return 'text-green-500';
  }
};

// Get status color
export const getStatusColor = (status) => {
  const statusLower = status?.toLowerCase();
  
  if (statusLower === 'active' || statusLower === 'open') {
    return 'text-green-500 bg-green-500/10';
  } else if (statusLower === 'pending' || statusLower === 'inprogress') {
    return 'text-yellow-500 bg-yellow-500/10';
  } else if (statusLower === 'inactive' || statusLower === 'dismissed') {
    return 'text-gray-500 bg-gray-500/10';
  } else if (statusLower === 'failed' || statusLower === 'error') {
    return 'text-red-500 bg-red-500/10';
  } else if (statusLower === 'suspicious') {
    return 'text-orange-500 bg-orange-500/10';
  } else {
    return 'text-blue-500 bg-blue-500/10';
  }
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random ID
export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validate IP address
export const isValidIP = (ip) => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(ip)) return false;
  
  const parts = ip.split('.');
  return parts.every((part) => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255;
  });
};

// Sort array by key
export const sortBy = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};
