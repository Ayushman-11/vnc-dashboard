import apiClient from './apiClient';

const metricsService = {
  // Get overall system metrics
  getMetrics: async () => {
    const response = await apiClient.get('/metrics');
    return response.data;
  },
  
  // Get traffic data over time
  getTrafficData: async (timeRange = '24h') => {
    const response = await apiClient.get('/metrics/traffic', { params: { timeRange } });
    return response.data;
  },
  
  // Get severity distribution
  getSeverityDistribution: async () => {
    const response = await apiClient.get('/metrics/severity-distribution');
    return response.data;
  },
  
  // Get system health
  getSystemHealth: async () => {
    const response = await apiClient.get('/metrics/health');
    return response.data;
  },
  
  // Get performance metrics
  getPerformanceMetrics: async () => {
    const response = await apiClient.get('/metrics/performance');
    return response.data;
  },
};

export default metricsService;
