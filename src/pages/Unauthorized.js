/**
 * Unauthorized Page
 * 
 * Displayed when user doesn't have required permissions
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiArrowLeft, FiHome } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { RoleBadge } from '../components/auth';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { role, name } = useAuth();
  
  return (
    <div className="min-h-screen bg-[#0D0E1C] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-[#17182F] border border-white/10 rounded-2xl p-8 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 mb-6">
            <FiAlertTriangle className="text-4xl text-orange-400" />
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-3">
            Access Denied
          </h1>
          
          {/* Message */}
          <p className="text-gray-400 mb-6 text-lg">
            You don't have permission to access this page.
          </p>
          
          {/* User Info */}
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-gray-400">Signed in as:</span>
              <span className="text-white font-medium">{name}</span>
            </div>
            <div className="flex justify-center">
              <RoleBadge role={role} />
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
              <FiAlertTriangle className="text-lg" />
              Need Access?
            </h3>
            <p className="text-gray-400 text-sm">
              If you believe you should have access to this page, please contact your system administrator 
              to request the appropriate permissions for your role.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
            >
              <FiArrowLeft />
              Go Back
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all"
            >
              <FiHome />
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
