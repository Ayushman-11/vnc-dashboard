import { create } from 'zustand';
import { ALERT_STATUS, ALERT_SEVERITY } from '../constants';

const useAlertStore = create((set, get) => ({
  // State
  alerts: [],
  filteredAlerts: [],
  loading: false,
  error: null,
  filters: {
    severity: null,
    status: null,
    type: null,
    searchQuery: '',
  },
  summary: {
    open: 0,
    inProgress: 0,
    dismissed: 0,
    resolved: 0,
  },
  
  // Actions
  setAlerts: (alerts) => {
    set({ alerts });
    get().applyFilters();
    get().updateSummary();
  },
  
  addAlert: (alert) => {
    const alerts = [alert, ...get().alerts];
    set({ alerts });
    get().applyFilters();
    get().updateSummary();
  },
  
  updateAlert: (id, updates) => {
    const alerts = get().alerts.map((alert) =>
      alert.id === id ? { ...alert, ...updates } : alert
    );
    set({ alerts });
    get().applyFilters();
    get().updateSummary();
  },
  
  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
    get().applyFilters();
  },
  
  clearFilters: () => {
    set({
      filters: {
        severity: null,
        status: null,
        type: null,
        searchQuery: '',
      },
    });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { alerts, filters } = get();
    let filtered = [...alerts];
    
    if (filters.severity) {
      filtered = filtered.filter((alert) => alert.severity === filters.severity);
    }
    
    if (filters.status) {
      filtered = filtered.filter((alert) => alert.status === filters.status);
    }
    
    if (filters.type) {
      filtered = filtered.filter((alert) => alert.type === filters.type);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (alert) =>
          alert.type?.toLowerCase().includes(query) ||
          alert.session?.toLowerCase().includes(query) ||
          alert.description?.toLowerCase().includes(query)
      );
    }
    
    set({ filteredAlerts: filtered });
  },
  
  updateSummary: () => {
    const { alerts } = get();
    const summary = {
      open: alerts.filter((a) => a.status === ALERT_STATUS.OPEN).length,
      inProgress: alerts.filter((a) => a.status === ALERT_STATUS.IN_PROGRESS).length,
      dismissed: alerts.filter((a) => a.status === ALERT_STATUS.DISMISSED).length,
      resolved: alerts.filter((a) => a.status === ALERT_STATUS.RESOLVED).length,
    };
    set({ summary });
  },
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  // Selectors
  getAlertById: (id) => get().alerts.find((alert) => alert.id === id),
  
  getHighPriorityAlerts: () =>
    get().alerts.filter(
      (alert) =>
        (alert.severity === ALERT_SEVERITY.HIGH ||
          alert.severity === ALERT_SEVERITY.CRITICAL) &&
        alert.status === ALERT_STATUS.OPEN
    ),
}));

export default useAlertStore;
