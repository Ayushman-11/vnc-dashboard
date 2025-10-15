import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon,
  iconBg = 'bg-purple-500/20',
  iconColor = 'text-purple-400',
  gradient = 'purple' // New prop for different gradients
}) => {
  const isPositive = changeType === 'positive';
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const changeBg = isPositive ? 'bg-green-500/20' : 'bg-red-500/20';
  const TrendIcon = isPositive ? FiTrendingUp : FiTrendingDown;
  
  // Different gradient options
  const gradients = {
    purple: 'bg-gradient-to-br from-[#3d2e6a] via-[#2a1f4a] to-[#1a1433] border-purple-500/30 hover:border-purple-400/60 hover:shadow-purple-500/30',
    blue: 'bg-gradient-to-br from-[#1e3a5f] via-[#1a2942] to-[#131b2e] border-blue-500/30 hover:border-blue-400/60 hover:shadow-blue-500/30',
    teal: 'bg-gradient-to-br from-[#1e4d4d] via-[#1a3838] to-[#132828] border-teal-500/30 hover:border-teal-400/60 hover:shadow-teal-500/30',
    pink: 'bg-gradient-to-br from-[#4d1e4d] via-[#381a38] to-[#281328] border-pink-500/30 hover:border-pink-400/60 hover:shadow-pink-500/30',
    orange: 'bg-gradient-to-br from-[#4d2e1e] via-[#382216] to-[#281610] border-orange-500/30 hover:border-orange-400/60 hover:shadow-orange-500/30'
  };
  
  return (
    <div className={`${gradients[gradient]} rounded-xl p-6 transition-all backdrop-blur-sm shadow-xl`}>
      {/* Icon */}
      {Icon && (
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center mb-4`}>
          <Icon className={`text-lg ${iconColor}`} />
        </div>
      )}
      
      {/* Title */}
      <div className="text-gray-400 text-sm mb-2">{title}</div>
      
      {/* Value and Change */}
      <div className="flex items-end justify-between">
        <div className="text-white text-3xl font-bold">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        
        {change && (
          <div className={`flex items-center px-2 py-1 rounded-lg ${changeBg}`}>
            <TrendIcon className={`text-sm ${changeColor} mr-1`} />
            <span className={`text-xs font-semibold ${changeColor}`}>
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
