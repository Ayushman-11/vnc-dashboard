import { create } from 'zustand';
import { FIREWALL_STATUS } from '../constants';

const useFirewallStore = create((set, get) => ({
  // State
  rules: [],
  filteredRules: [],
  loading: false,
  error: null,
  filters: {
    status: null,
    searchQuery: '',
  },
  statistics: {
    total: 0,
    active: 0,
    inactive: 0,
    pending: 0,
    failed: 0,
  },
  
  // Actions
  setRules: (rules) => {
    set({ rules });
    get().applyFilters();
    get().updateStatistics();
  },
  
  addRule: (rule) => {
    const rules = [rule, ...get().rules];
    set({ rules });
    get().applyFilters();
    get().updateStatistics();
  },
  
  updateRule: (id, updates) => {
    const rules = get().rules.map((rule) =>
      rule.id === id ? { ...rule, ...updates } : rule
    );
    set({ rules });
    get().applyFilters();
    get().updateStatistics();
  },
  
  removeRule: (id) => {
    const rules = get().rules.filter((rule) => rule.id !== id);
    set({ rules });
    get().applyFilters();
    get().updateStatistics();
  },

  deleteRule: (id) => {
    // Alias for removeRule to match the naming convention used in pages
    get().removeRule(id);
  },
  
  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
    get().applyFilters();
  },
  
  clearFilters: () => {
    set({
      filters: {
        status: null,
        searchQuery: '',
      },
    });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { rules, filters } = get();
    let filtered = [...rules];
    
    if (filters.status) {
      filtered = filtered.filter((rule) => rule.status === filters.status);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (rule) =>
          rule.ipAddress?.toLowerCase().includes(query) ||
          rule.action?.toLowerCase().includes(query) ||
          rule.reason?.toLowerCase().includes(query)
      );
    }
    
    set({ filteredRules: filtered });
  },
  
  updateStatistics: () => {
    const { rules } = get();
    const statistics = {
      total: rules.length,
      active: rules.filter((r) => r.status === FIREWALL_STATUS.ACTIVE).length,
      inactive: rules.filter((r) => r.status === FIREWALL_STATUS.INACTIVE).length,
      pending: rules.filter((r) => r.status === FIREWALL_STATUS.PENDING).length,
      failed: rules.filter((r) => r.status === FIREWALL_STATUS.FAILED).length,
    };
    set({ statistics });
  },
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  // Selectors
  getRuleById: (id) => get().rules.find((rule) => rule.id === id),
  
  getActiveRules: () =>
    get().rules.filter((rule) => rule.status === FIREWALL_STATUS.ACTIVE),
}));

export default useFirewallStore;
