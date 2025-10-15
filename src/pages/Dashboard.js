import React, { useState } from 'react';
import { 
  FiShield, 
  FiActivity, 
  FiLock, 
  FiAlertTriangle,
  FiPlus 
} from 'react-icons/fi';
import { MetricCard, Button } from '../components/common';
import {
  AlertsSeverityChart,
  AlertsStatusChart,
  TrafficChart,
  RecentAlerts,
  SessionsTable,
} from '../components/dashboard';
import { useAlertStore, useSessionStore, useFirewallStore, useMetricsStore } from '../store';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('24h');
  
  // Get data from stores
  const { alerts, summary } = useAlertStore();
  const { activeSessions, statistics: sessionStats } = useSessionStore();
  const { statistics: firewallStats } = useFirewallStore();
  const { metrics, trafficData } = useMetricsStore();
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-sm text-gray-400">Real-time VNC Security Monitoring</p>
        </div>
      </div>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Alerts on Managed"
          value={metrics.totalAlerts || summary.open + summary.inProgress}
          change="+0.30%"
          changeType="positive"
          icon={FiAlertTriangle}
          iconBg="bg-orange-500/20"
          iconColor="text-orange-400"
          gradient="orange"
        />
        <MetricCard
          title="Internet exposed computers"
          value={sessionStats.active || activeSessions.length}
          change="-0.25%"
          changeType="negative"
          icon={FiActivity}
          iconBg="bg-purple-500/20"
          iconColor="text-purple-400"
          gradient="purple"
        />
        <MetricCard
          title="Assets running vulnerable"
          value={sessionStats.suspicious || 0}
          change="+0.20%"
          changeType="positive"
          icon={FiShield}
          iconBg="bg-blue-500/20"
          iconColor="text-blue-400"
          gradient="blue"
        />
        <MetricCard
          title="Unsafe AI 3rd party"
          value={firewallStats.active || 0}
          change="-0.45%"
          changeType="negative"
          icon={FiLock}
          iconBg="bg-pink-500/20"
          iconColor="text-pink-400"
          gradient="pink"
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsStatusChart summary={summary} />
        <TrafficChart 
          data={trafficData.length > 0 ? trafficData : [
            { time: 'Mar 22', volume: 280 },
            { time: 'Mar 23', volume: 450 },
            { time: 'Mar 24', volume: 320 },
            { time: 'Mar 25', volume: 680 },
            { time: 'Mar 26', volume: 510 },
            { time: 'Today', volume: 720 },
          ]}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      </div>
      
      {/* Sessions Table and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SessionsTable sessions={activeSessions} />
        </div>
        <div>
          <AlertsSeverityChart data={alerts} />
        </div>
      </div>
      
      {/* Recent Alerts */}
      <RecentAlerts alerts={alerts} />
    </div>
  );
};

export default Dashboard;
