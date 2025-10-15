import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';

const Card = ({ 
  title, 
  subtitle, 
  children, 
  actions,
  className = '',
  headerRight,
  noPadding = false,
  gradient = 'purple' // New prop for different gradients
}) => {
  // Different gradient options
  const gradients = {
    purple: 'bg-gradient-to-br from-[#3d2e6a] via-[#2a1f4a] to-[#1a1433] border-purple-500/30',
    blue: 'bg-gradient-to-br from-[#1e3a5f] via-[#1a2942] to-[#131b2e] border-blue-500/30',
    teal: 'bg-gradient-to-br from-[#1e4d4d] via-[#1a3838] to-[#132828] border-teal-500/30',
    pink: 'bg-gradient-to-br from-[#4d1e4d] via-[#381a38] to-[#281328] border-pink-500/30',
    orange: 'bg-gradient-to-br from-[#4d2e1e] via-[#382216] to-[#281610] border-orange-500/30',
    default: 'bg-gradient-to-br from-[#2a2842] via-[#1e1b35] to-[#16141f] border-gray-500/20'
  };
  
  return (
    <div className={`${gradients[gradient]} rounded-xl backdrop-blur-sm shadow-xl ${className}`}>
      {/* Header */}
      {(title || actions || headerRight) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            {title && <h3 className="text-white text-lg font-semibold">{title}</h3>}
            {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {headerRight}
            {actions && (
              <button className="text-gray-400 hover:text-white transition-colors">
                <FiMoreVertical />
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};

export default Card;
