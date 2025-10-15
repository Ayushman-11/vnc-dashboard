import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#2a2c44] border border-[#3a3c54] rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default SearchBar;
