import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts';
import { Dashboard, Sessions, Alerts, Firewall } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="firewall" element={<Firewall />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
