/**
 * VNC SOAR Dashboard - Main Application
 * 
 * IMPORTANT FOR DEVELOPERS & AI ASSISTANTS:
 * Before creating or modifying any components, pages, or features,
 * please read the complete design system documentation:
 * 
 * 📖 See: /DESIGN_SYSTEM.md
 * 
 * This ensures consistency across:
 * - Color schemes and gradients
 * - Icon-only action buttons with tooltips
 * - Modal implementations
 * - Component patterns and layouts
 * - Responsive design
 * - Dark theme standards
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { MainLayout } from './layouts';
import { Dashboard, Sessions, Alerts, Firewall, Settings, UserManagement, SignIn, SignUp, Unauthorized } from './pages';
import ProtectedRoute from './auth/ProtectedRoute';
import { PERMISSIONS } from './utils/permissions';

// Get Clerk publishable key from environment variables
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk Publishable Key');
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Routes>
          {/* Public Routes - Authentication */}
          <Route path="/sign-in/*" element={<SignIn />} />
          <Route path="/sign-up/*" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected Routes - Main Application */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            <Route path="dashboard" element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_DASHBOARD]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="sessions" element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_SESSIONS]}>
                <Sessions />
              </ProtectedRoute>
            } />
            
            <Route path="alerts" element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_ALERTS]}>
                <Alerts />
              </ProtectedRoute>
            } />
            
            <Route path="firewall" element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_FIREWALL]}>
                <Firewall />
              </ProtectedRoute>
            } />
            
            <Route path="settings" element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.VIEW_SETTINGS]}>
                <Settings />
              </ProtectedRoute>
            } />
            
            <Route path="users" element={
              <ProtectedRoute requiredPermissions={[PERMISSIONS.MANAGE_USERS]}>
                <UserManagement />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
