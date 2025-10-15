import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiShield,
  FiGrid,
  FiActivity,
  FiAlertTriangle,
  FiLock,
  FiSettings,
  FiChevronDown,
} from 'react-icons/fi';

const Sidebar = ({ user = { name: 'Niko Sario', role: 'Lead Product Design' } }) => {
  
  const menuItems = [
    { path: '/dashboard', icon: FiGrid, label: 'Dashboard' },
    { path: '/sessions', icon: FiActivity, label: 'VNC Sessions' },
    { path: '/alerts', icon: FiAlertTriangle, label: 'Alerts' },
    { path: '/firewall', icon: FiLock, label: 'Firewall Rules' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];
  
  return (
    <div className="w-64 bg-[#17182F] border-r border-[#2a2c44] flex flex-col h-screen">
      {/* Logo */}
      <div className="flex items-center px-6 py-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
          <FiShield className="text-white text-lg" />
        </div>
        <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
          VNC SOAR
        </span>
      </div>
      
      {/* User Profile */}
      <div className="mx-4 mb-6 bg-[#2a2c44] rounded-lg p-3 flex items-center cursor-pointer hover:bg-[#33354d] transition-colors">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
          {user.name.charAt(0)}
        </div>
        <div className="ml-3 flex-1">
          <div className="text-white font-semibold text-sm">{user.name}</div>
          <div className="text-gray-400 text-xs">{user.role}</div>
        </div>
        <FiChevronDown className="text-gray-400" />
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mb-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600/20 to-purple-600/10 text-white border-l-4 border-purple-500'
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2c44]'
              }`
            }
          >
            <item.icon className="text-lg" />
            <span className="ml-3 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Trial Info */}
      <div className="m-4 p-4 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30">
        <p className="text-gray-300 text-sm mb-2">Trial period in 28 days</p>
        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
