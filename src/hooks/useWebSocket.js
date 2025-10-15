import { useEffect, useState } from 'react';
import { websocketService } from '../services';
import { WS_EVENTS } from '../constants';
import { useAlertStore, useSessionStore, useFirewallStore, useMetricsStore } from '../store';

// Custom hook to manage WebSocket connection and real-time updates
export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  
  const addAlert = useAlertStore((state) => state.addAlert);
  const updateSession = useSessionStore((state) => state.updateSession);
  const addSession = useSessionStore((state) => state.addSession);
  const updateRule = useFirewallStore((state) => state.updateRule);
  const addRule = useFirewallStore((state) => state.addRule);
  const setMetrics = useMetricsStore((state) => state.setMetrics);
  const addTrafficData = useMetricsStore((state) => state.addTrafficData);
  
  useEffect(() => {
    // Connect to WebSocket
    websocketService.connect();
    
    // Listen for connection status
    const handleConnectionStatus = (data) => {
      setIsConnected(data.connected);
      if (!data.connected) {
        console.warn('WebSocket disconnected:', data.reason);
      }
    };
    
    // Listen for connection errors
    const handleConnectionError = (data) => {
      setError(data.message);
      console.error('WebSocket connection error:', data.error);
    };
    
    // Listen for new alerts
    const handleNewAlert = (alert) => {
      console.log('New alert received:', alert);
      addAlert(alert);
    };
    
    // Listen for session updates
    const handleSessionUpdate = (session) => {
      console.log('Session update received:', session);
      if (session.isNew) {
        addSession(session);
      } else {
        updateSession(session.id, session);
      }
    };
    
    // Listen for firewall updates
    const handleFirewallUpdate = (rule) => {
      console.log('Firewall update received:', rule);
      if (rule.isNew) {
        addRule(rule);
      } else {
        updateRule(rule.id, rule);
      }
    };
    
    // Listen for metrics updates
    const handleMetricsUpdate = (metrics) => {
      console.log('Metrics update received:', metrics);
      setMetrics(metrics);
      
      if (metrics.trafficData) {
        addTrafficData(metrics.trafficData);
      }
    };
    
    // Register all event listeners
    websocketService.on('connection_status', handleConnectionStatus);
    websocketService.on('connection_error', handleConnectionError);
    websocketService.on(WS_EVENTS.NEW_ALERT, handleNewAlert);
    websocketService.on(WS_EVENTS.SESSION_UPDATE, handleSessionUpdate);
    websocketService.on(WS_EVENTS.FIREWALL_UPDATE, handleFirewallUpdate);
    websocketService.on(WS_EVENTS.METRICS_UPDATE, handleMetricsUpdate);
    
    // Cleanup on unmount
    return () => {
      websocketService.off('connection_status', handleConnectionStatus);
      websocketService.off('connection_error', handleConnectionError);
      websocketService.off(WS_EVENTS.NEW_ALERT, handleNewAlert);
      websocketService.off(WS_EVENTS.SESSION_UPDATE, handleSessionUpdate);
      websocketService.off(WS_EVENTS.FIREWALL_UPDATE, handleFirewallUpdate);
      websocketService.off(WS_EVENTS.METRICS_UPDATE, handleMetricsUpdate);
      websocketService.disconnect();
    };
  }, [addAlert, updateSession, addSession, updateRule, addRule, setMetrics, addTrafficData]);
  
  return { isConnected, error };
};

export default useWebSocket;
