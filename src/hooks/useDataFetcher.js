import { useEffect, useState } from 'react';
import { alertService, sessionService, firewallService, metricsService } from '../services';
import { useAlertStore, useSessionStore, useFirewallStore, useMetricsStore } from '../store';
import { mockAlerts, mockSessions, mockFirewallRules, mockMetrics, mockTrafficData, mockSeverityDistribution } from '../utils/mockData';

// Custom hook to fetch initial data on component mount
export const useDataFetcher = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);
  
  const setAlerts = useAlertStore((state) => state.setAlerts);
  const setAlertLoading = useAlertStore((state) => state.setLoading);
  const setAlertError = useAlertStore((state) => state.setError);
  
  const setSessions = useSessionStore((state) => state.setSessions);
  const setSessionLoading = useSessionStore((state) => state.setLoading);
  const setSessionError = useSessionStore((state) => state.setError);
  
  const setRules = useFirewallStore((state) => state.setRules);
  const setFirewallLoading = useFirewallStore((state) => state.setLoading);
  const setFirewallError = useFirewallStore((state) => state.setError);
  
  const setMetrics = useMetricsStore((state) => state.setMetrics);
  const setTrafficData = useMetricsStore((state) => state.setTrafficData);
  const setSeverityDistribution = useMetricsStore((state) => state.setSeverityDistribution);
  const setMetricsLoading = useMetricsStore((state) => state.setLoading);
  const setMetricsError = useMetricsStore((state) => state.setError);
  
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch alerts
        setAlertLoading(true);
        try {
          const alertsData = await alertService.getAlerts();
          setAlerts(alertsData.alerts || alertsData);
          setAlertError(null);
          setUseMockData(false);
        } catch (err) {
          console.warn('Failed to fetch alerts from backend, using mock data:', err);
          setAlerts(mockAlerts);
          setAlertError(null);
          setUseMockData(true);
        } finally {
          setAlertLoading(false);
        }
        
        // Fetch sessions
        setSessionLoading(true);
        try {
          const sessionsData = await sessionService.getSessions();
          setSessions(sessionsData.sessions || sessionsData);
          setSessionError(null);
        } catch (err) {
          console.warn('Failed to fetch sessions from backend, using mock data:', err);
          setSessions(mockSessions);
          setSessionError(null);
        } finally {
          setSessionLoading(false);
        }
        
        // Fetch firewall rules
        setFirewallLoading(true);
        try {
          const rulesData = await firewallService.getRules();
          setRules(rulesData.rules || rulesData);
          setFirewallError(null);
        } catch (err) {
          console.warn('Failed to fetch firewall rules from backend, using mock data:', err);
          setRules(mockFirewallRules);
          setFirewallError(null);
        } finally {
          setFirewallLoading(false);
        }
        
        // Fetch metrics
        setMetricsLoading(true);
        try {
          const metricsData = await metricsService.getMetrics();
          setMetrics(metricsData);
          
          const trafficData = await metricsService.getTrafficData();
          setTrafficData(trafficData);
          
          const severityData = await metricsService.getSeverityDistribution();
          setSeverityDistribution(severityData);
          
          setMetricsError(null);
        } catch (err) {
          console.warn('Failed to fetch metrics from backend, using mock data:', err);
          setMetrics(mockMetrics);
          setTrafficData(mockTrafficData);
          setSeverityDistribution(mockSeverityDistribution);
          setMetricsError(null);
        } finally {
          setMetricsLoading(false);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, [
    setAlerts,
    setAlertLoading,
    setAlertError,
    setSessions,
    setSessionLoading,
    setSessionError,
    setRules,
    setFirewallLoading,
    setFirewallError,
    setMetrics,
    setTrafficData,
    setSeverityDistribution,
    setMetricsLoading,
    setMetricsError,
  ]);
  
  return { loading, error, useMockData };
};

export default useDataFetcher;
