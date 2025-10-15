import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common';
import { useWebSocket, useDataFetcher } from '../hooks';
import { FiWifi, FiWifiOff } from 'react-icons/fi';

const MainLayout = () => {
  const { isConnected } = useWebSocket();
  const { loading, error } = useDataFetcher();
  
  return (
    <div className="flex h-screen bg-[#0D0E1C] overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Connection Status Bar */}
        {!isConnected && (
          <div className="bg-red-500/10 border-b border-red-500/30 px-6 py-2 flex items-center gap-2">
            <FiWifiOff className="text-red-400" />
            <span className="text-red-400 text-sm">
              Real-time connection lost. Attempting to reconnect...
            </span>
          </div>
        )}
        
        {isConnected && (
          <div className="bg-green-500/10 border-b border-green-500/30 px-6 py-2 flex items-center gap-2 animate-pulse">
            <FiWifi className="text-green-400" />
            <span className="text-green-400 text-sm">
              Real-time monitoring active
            </span>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading dashboard...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-red-400">
                <p className="text-lg font-semibold mb-2">Error loading data</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
