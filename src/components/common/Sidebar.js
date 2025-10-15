import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiShield,
  FiGrid,
  FiActivity,
  FiAlertTriangle,
  FiLock,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { UserButton, RoleBadge } from '../auth';
import { PERMISSIONS } from '../../utils/permissions';

const Sidebar = () => {
  const { name, role } = useAuth();
  const { can } = usePermissions();
  
  const menuItems = [
    { 
      path: '/dashboard', 
      icon: FiGrid, 
      label: 'Dashboard',
      show: can(PERMISSIONS.VIEW_DASHBOARD)
    },
    { 
      path: '/sessions', 
      icon: FiActivity, 
      label: 'VNC Sessions',
      show: can(PERMISSIONS.VIEW_SESSIONS)
    },
    { 
      path: '/alerts', 
      icon: FiAlertTriangle, 
      label: 'Alerts',
      show: can(PERMISSIONS.VIEW_ALERTS)
    },
    { 
      path: '/firewall', 
      icon: FiLock, 
      label: 'Firewall Rules',
      show: can(PERMISSIONS.VIEW_FIREWALL)
    },
    { 
      path: '/settings', 
      icon: FiSettings, 
      label: 'Settings',
      show: can(PERMISSIONS.VIEW_SETTINGS)
    },
    { 
      path: '/users', 
      icon: FiUsers, 
      label: 'User Management',
      show: can(PERMISSIONS.MANAGE_USERS)
    },
  ];
  
  // Filter menu items based on permissions
  const visibleMenuItems = menuItems.filter(item => item.show);
  
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
      <div className="mx-4 mb-6 bg-[#2a2c44] rounded-lg p-3">
        <div className="flex items-center gap-3 mb-3">
          <UserButton />
          <div className="flex-1 min-w-0">
            <div className="text-white font-semibold text-sm truncate">{name}</div>
            <div className="mt-1">
              <RoleBadge role={role} size="sm" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        {visibleMenuItems.map((item) => (
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
