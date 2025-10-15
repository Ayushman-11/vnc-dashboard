import apiClient from './apiClient';

const alertService = {
  // Get all alerts with optional filters
  getAlerts: async (params = {}) => {
    const response = await apiClient.get('/alerts', { params });
    return response.data;
  },
  
  // Get a single alert by ID
  getAlertById: async (id) => {
    const response = await apiClient.get(`/alerts/${id}`);
    return response.data;
  },
  
  // Get alert summary statistics
  getAlertSummary: async () => {
    const response = await apiClient.get('/alerts/summary');
    return response.data;
  },
  
  // Update alert status
  updateAlertStatus: async (id, status) => {
    const response = await apiClient.patch(`/alerts/${id}/status`, { status });
    return response.data;
  },
  
  // Update alert (generic)
  updateAlert: async (id, updates) => {
    const response = await apiClient.patch(`/alerts/${id}`, updates);
    return response.data;
  },
  
  // Dismiss alert
  dismissAlert: async (id, reason) => {
    const response = await apiClient.post(`/alerts/${id}/dismiss`, { reason });
    return response.data;
  },
  
  // Acknowledge alert
  acknowledgeAlert: async (id) => {
    const response = await apiClient.post(`/alerts/${id}/acknowledge`);
    return response.data;
  },
  
  // Get alerts by severity
  getAlertsBySeverity: async (severity) => {
    const response = await apiClient.get(`/alerts/severity/${severity}`);
    return response.data;
  },
  
  // Get recent alerts (last N alerts)
  getRecentAlerts: async (limit = 10) => {
    const response = await apiClient.get('/alerts/recent', { params: { limit } });
    return response.data;
  },
};

export default alertService;
