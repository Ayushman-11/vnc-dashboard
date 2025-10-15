import apiClient from './apiClient';

const sessionService = {
  // Get all sessions with optional filters
  getSessions: async (params = {}) => {
    const response = await apiClient.get('/sessions', { params });
    return response.data;
  },
  
  // Get a single session by ID
  getSessionById: async (id) => {
    const response = await apiClient.get(`/sessions/${id}`);
    return response.data;
  },
  
  // Get active sessions
  getActiveSessions: async () => {
    const response = await apiClient.get('/sessions/active');
    return response.data;
  },
  
  // Get session statistics
  getSessionStatistics: async () => {
    const response = await apiClient.get('/sessions/statistics');
    return response.data;
  },
  
  // Update session
  updateSession: async (id, updates) => {
    const response = await apiClient.patch(`/sessions/${id}`, updates);
    return response.data;
  },
  
  // Terminate session
  terminateSession: async (id, reason) => {
    const response = await apiClient.post(`/sessions/${id}/terminate`, { reason });
    return response.data;
  },
  
  // Get session history
  getSessionHistory: async (id) => {
    const response = await apiClient.get(`/sessions/${id}/history`);
    return response.data;
  },
  
  // Get sessions by user
  getSessionsByUser: async (username) => {
    const response = await apiClient.get(`/sessions/user/${username}`);
    return response.data;
  },
  
  // Get high-risk sessions
  getHighRiskSessions: async () => {
    const response = await apiClient.get('/sessions/high-risk');
    return response.data;
  },
  
  // Get session metrics over time
  getSessionMetrics: async (timeRange = '24h') => {
    const response = await apiClient.get('/sessions/metrics', { params: { timeRange } });
    return response.data;
  },
};

export default sessionService;
