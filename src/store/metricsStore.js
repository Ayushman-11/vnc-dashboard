import { create } from 'zustand';

const useMetricsStore = create((set, get) => ({
  // State
  metrics: {
    totalAlerts: 0,
    activeSessions: 0,
    blockedIPs: 0,
    riskScore: 0,
    dataTransferred: 0,
    threatsBlocked: 0,
  },
  trafficData: [],
  severityDistribution: [],
  loading: false,
  error: null,
  
  // Actions
  setMetrics: (metrics) => set({ metrics: { ...get().metrics, ...metrics } }),
  
  setTrafficData: (trafficData) => set({ trafficData }),
  
  addTrafficData: (dataPoint) => {
    const trafficData = [...get().trafficData, dataPoint];
    // Keep only last 24 hours of data
    if (trafficData.length > 24) {
      trafficData.shift();
    }
    set({ trafficData });
  },
  
  setSeverityDistribution: (severityDistribution) => set({ severityDistribution }),
  
  updateMetric: (key, value) => {
    set({ metrics: { ...get().metrics, [key]: value } });
  },
  
  incrementMetric: (key, amount = 1) => {
    const currentValue = get().metrics[key] || 0;
    set({ metrics: { ...get().metrics, [key]: currentValue + amount } });
  },
  
  decrementMetric: (key, amount = 1) => {
    const currentValue = get().metrics[key] || 0;
    set({ metrics: { ...get().metrics, [key]: Math.max(0, currentValue - amount) } });
  },
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  // Reset all metrics
  resetMetrics: () => {
    set({
      metrics: {
        totalAlerts: 0,
        activeSessions: 0,
        blockedIPs: 0,
        riskScore: 0,
        dataTransferred: 0,
        threatsBlocked: 0,
      },
      trafficData: [],
      severityDistribution: [],
    });
  },
}));

export default useMetricsStore;
