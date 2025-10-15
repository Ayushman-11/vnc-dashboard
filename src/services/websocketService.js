import { io } from 'socket.io-client';
import { WS_URL, WS_EVENTS } from '../constants';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }
  
  // Initialize socket connection
  connect() {
    if (this.socket?.connected) {
      console.log('WebSocket already connected');
      return;
    }
    
    this.socket = io(WS_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
    });
    
    this.setupEventListeners();
  }
  
  // Setup default event listeners
  setupEventListeners() {
    if (!this.socket) return;
    
    this.socket.on(WS_EVENTS.CONNECT, () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.notifyListeners('connection_status', { connected: true });
    });
    
    this.socket.on(WS_EVENTS.DISCONNECT, (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.notifyListeners('connection_status', { connected: false, reason });
    });
    
    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.notifyListeners('connection_error', {
          message: 'Failed to connect after multiple attempts',
          error,
        });
      }
    });
    
    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.notifyListeners('error', { error });
    });
  }
  
  // Subscribe to a specific event
  on(event, callback) {
    if (!this.socket) {
      console.warn('Socket not initialized. Call connect() first.');
      return;
    }
    
    // Store callback for manual notification management
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    
    // Register with socket.io
    this.socket.on(event, callback);
  }
  
  // Unsubscribe from an event
  off(event, callback) {
    if (!this.socket) return;
    
    // Remove from local listeners
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
    
    // Unregister from socket.io
    this.socket.off(event, callback);
  }
  
  // Emit an event to the server
  emit(event, data) {
    if (!this.socket?.connected) {
      console.warn('Socket not connected. Cannot emit event:', event);
      return;
    }
    
    this.socket.emit(event, data);
  }
  
  // Notify all listeners of a custom event
  notifyListeners(event, data) {
    if (!this.listeners.has(event)) return;
    
    this.listeners.get(event).forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in listener for ${event}:`, error);
      }
    });
  }
  
  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
      console.log('WebSocket disconnected');
    }
  }
  
  // Check if socket is connected
  isConnected() {
    return this.socket?.connected || false;
  }
  
  // Get socket ID
  getSocketId() {
    return this.socket?.id || null;
  }
}

// Export singleton instance
const websocketService = new WebSocketService();
export default websocketService;
