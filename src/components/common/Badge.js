import React from 'react';
import { getSeverityColor, getStatusColor } from '../../utils';

const Badge = ({ 
  children, 
  variant = 'default', 
  severity,
  status,
  className = '' 
}) => {
  let colorClasses = 'bg-gray-500/10 text-gray-400';
  
  if (severity) {
    colorClasses = getSeverityColor(severity);
  } else if (status) {
    colorClasses = getStatusColor(status);
  } else {
    switch (variant) {
      case 'success':
        colorClasses = 'bg-green-500/10 text-green-400';
        break;
      case 'warning':
        colorClasses = 'bg-yellow-500/10 text-yellow-400';
        break;
      case 'error':
        colorClasses = 'bg-red-500/10 text-red-400';
        break;
      case 'info':
        colorClasses = 'bg-blue-500/10 text-blue-400';
        break;
      case 'purple':
        colorClasses = 'bg-purple-500/10 text-purple-400';
        break;
      default:
        break;
    }
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${colorClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
