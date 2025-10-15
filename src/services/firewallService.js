import apiClient from './apiClient';

const firewallService = {
  // Get all firewall rules
  getRules: async (params = {}) => {
    const response = await apiClient.get('/firewall/rules', { params });
    return response.data;
  },
  
  // Get a single rule by ID
  getRuleById: async (id) => {
    const response = await apiClient.get(`/firewall/rules/${id}`);
    return response.data;
  },
  
  // Get active rules
  getActiveRules: async () => {
    const response = await apiClient.get('/firewall/rules/active');
    return response.data;
  },
  
  // Get firewall statistics
  getFirewallStatistics: async () => {
    const response = await apiClient.get('/firewall/statistics');
    return response.data;
  },
  
  // Create a new firewall rule
  createRule: async (rule) => {
    const response = await apiClient.post('/firewall/rules', rule);
    return response.data;
  },
  
  // Update a firewall rule
  updateRule: async (id, updates) => {
    const response = await apiClient.patch(`/firewall/rules/${id}`, updates);
    return response.data;
  },
  
  // Delete a firewall rule
  deleteRule: async (id) => {
    const response = await apiClient.delete(`/firewall/rules/${id}`);
    return response.data;
  },
  
  // Activate a rule
  activateRule: async (id) => {
    const response = await apiClient.post(`/firewall/rules/${id}/activate`);
    return response.data;
  },
  
  // Deactivate a rule
  deactivateRule: async (id) => {
    const response = await apiClient.post(`/firewall/rules/${id}/deactivate`);
    return response.data;
  },
  
  // Block an IP address
  blockIP: async (ipAddress, reason, duration) => {
    const response = await apiClient.post('/firewall/block-ip', {
      ipAddress,
      reason,
      duration,
    });
    return response.data;
  },
  
  // Unblock an IP address
  unblockIP: async (ipAddress) => {
    const response = await apiClient.post('/firewall/unblock-ip', { ipAddress });
    return response.data;
  },
  
  // Get blocked IPs
  getBlockedIPs: async () => {
    const response = await apiClient.get('/firewall/blocked-ips');
    return response.data;
  },
};

export default firewallService;
