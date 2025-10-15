/**
 * Role Badge Component
 * 
 * Displays a user's role with icon and colored badge
 */

import React from 'react';
import { ROLE_CONFIG } from '../../utils/permissions';

const RoleBadge = ({ role, size = 'md', showIcon = true, showLabel = true }) => {
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.viewer;
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };
  
  return (
    <div 
      className={`
        inline-flex items-center gap-1.5 rounded-full 
        bg-gradient-to-r ${config.color} 
        text-white font-medium
        ${sizeClasses[size]}
      `}
      title={config.description}
    >
      {showIcon && <span className="text-sm">{config.icon}</span>}
      {showLabel && <span>{config.label}</span>}
    </div>
  );
};

export default RoleBadge;
