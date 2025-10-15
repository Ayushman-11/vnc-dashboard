import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from '../common';
import { FiAlertTriangle, FiMoreVertical } from 'react-icons/fi';
import { formatRelativeTime } from '../../utils';

const RecentAlerts = ({ alerts = [] }) => {
  const navigate = useNavigate();

  return (
    <Card title="Recent Alerts" subtitle="Last 10 alerts" actions gradient="default">
      <div className="space-y-3">
        {alerts.slice(0, 10).map((alert) => (
          <div 
            key={alert.id} 
            className="flex items-center justify-between p-3 bg-[#2a2c44] rounded-lg hover:bg-[#33354d] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <FiAlertTriangle className="text-red-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-sm">{alert.type}</span>
                  <Badge severity={alert.severity}>{alert.severity}</Badge>
                </div>
                <div className="text-gray-400 text-xs">{alert.session}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-xs">
                {alert.time || formatRelativeTime(alert.timestamp)}
              </span>
              <button className="text-gray-400 hover:text-white transition-colors">
                <FiMoreVertical />
              </button>
            </div>
          </div>
        ))}
        
        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No recent alerts
          </div>
        )}
      </div>
      
      {alerts.length > 0 && (
        <div className="mt-4">
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => navigate('/alerts')}
          >
            View All Alerts
          </Button>
        </div>
      )}
    </Card>
  );
};

export default RecentAlerts;
