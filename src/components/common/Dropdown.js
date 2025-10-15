import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({ 
  value, 
  onChange, 
  options = [], 
  placeholder = 'Select...', 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-[#2a2c44] border border-[#3a3c54] rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <FiChevronDown className="text-gray-400" />
      </div>
    </div>
  );
};

export default Dropdown;
