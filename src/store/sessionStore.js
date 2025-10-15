import { create } from 'zustand';
import { SESSION_STATUS } from '../constants';

const useSessionStore = create((set, get) => ({
  // State
  sessions: [],
  filteredSessions: [],
  activeSessions: [],
  loading: false,
  error: null,
  filters: {
    status: null,
    riskScoreMin: null,
    riskScoreMax: null,
    searchQuery: '',
  },
  statistics: {
    total: 0,
    active: 0,
    idle: 0,
    suspicious: 0,
    totalDataTransferred: 0,
  },
  
  // Actions
  setSessions: (sessions) => {
    set({ sessions });
    get().applyFilters();
    get().updateStatistics();
    get().updateActiveSessions();
  },
  
  addSession: (session) => {
    const sessions = [session, ...get().sessions];
    set({ sessions });
    get().applyFilters();
    get().updateStatistics();
    get().updateActiveSessions();
  },
  
  updateSession: (id, updates) => {
    const sessions = get().sessions.map((session) =>
      session.id === id ? { ...session, ...updates } : session
    );
    set({ sessions });
    get().applyFilters();
    get().updateStatistics();
    get().updateActiveSessions();
  },
  
  removeSession: (id) => {
    const sessions = get().sessions.filter((session) => session.id !== id);
    set({ sessions });
    get().applyFilters();
    get().updateStatistics();
    get().updateActiveSessions();
  },

  terminateSession: async (id) => {
    // Update session status to terminated
    const sessions = get().sessions.map((session) =>
      session.id === id 
        ? { ...session, status: 'Terminated', endTime: new Date().toISOString() } 
        : session
    );
    set({ sessions });
    get().applyFilters();
    get().updateStatistics();
    get().updateActiveSessions();
    
    // In real app, make API call here
    // await sessionService.terminateSession(id);
  },
  
  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
    get().applyFilters();
  },
  
  clearFilters: () => {
    set({
      filters: {
        status: null,
        riskScoreMin: null,
        riskScoreMax: null,
        searchQuery: '',
      },
    });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { sessions, filters } = get();
    let filtered = [...sessions];
    
    if (filters.status) {
      filtered = filtered.filter((session) => session.status === filters.status);
    }
    
    if (filters.riskScoreMin !== null) {
      filtered = filtered.filter((session) => session.score >= filters.riskScoreMin);
    }
    
    if (filters.riskScoreMax !== null) {
      filtered = filtered.filter((session) => session.score <= filters.riskScoreMax);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (session) =>
          session.id?.toLowerCase().includes(query) ||
          session.user?.toLowerCase().includes(query) ||
          session.ip?.toLowerCase().includes(query)
      );
    }
    
    set({ filteredSessions: filtered });
  },
  
  updateStatistics: () => {
    const { sessions } = get();
    const statistics = {
      total: sessions.length,
      active: sessions.filter((s) => s.status === SESSION_STATUS.ACTIVE).length,
      idle: sessions.filter((s) => s.status === SESSION_STATUS.IDLE).length,
      suspicious: sessions.filter((s) => s.status === SESSION_STATUS.SUSPICIOUS).length,
      totalDataTransferred: sessions.reduce((sum, s) => sum + (s.transferred || 0), 0),
    };
    set({ statistics });
  },
  
  updateActiveSessions: () => {
    const activeSessions = get().sessions.filter(
      (s) => s.status === SESSION_STATUS.ACTIVE
    );
    set({ activeSessions });
  },
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  // Selectors
  getSessionById: (id) => get().sessions.find((session) => session.id === id),
  
  getHighRiskSessions: () =>
    get().sessions.filter((session) => session.score >= 8.0),
}));

export default useSessionStore;
