// Mock data for development and testing
import { ALERT_SEVERITY, ALERT_STATUS, SESSION_STATUS, FIREWALL_STATUS } from '../constants';

export const mockAlerts = [
  {
    id: 'ALT_001',
    type: 'Large Upload',
    severity: ALERT_SEVERITY.HIGH,
    status: ALERT_STATUS.OPEN,
    session: 'user_admin / 192.168.1.101',
    time: '2m ago',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    description: 'Unusual data transfer detected - 1.2GB uploaded',
  },
  {
    id: 'ALT_002',
    type: 'Unusual Port Access',
    severity: ALERT_SEVERITY.MEDIUM,
    status: ALERT_STATUS.OPEN,
    session: 'svc_backup / 10.0.0.54',
    time: '15m ago',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    description: 'Access to non-standard port detected',
  },
  {
    id: 'ALT_003',
    type: 'Anomalous User Agent',
    severity: ALERT_SEVERITY.LOW,
    status: ALERT_STATUS.DISMISSED,
    session: 'user_guest / 172.16.30.12',
    time: '45m ago',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    description: 'Suspicious user agent string detected',
  },
  {
    id: 'ALT_004',
    type: 'Data Exfiltration',
    severity: ALERT_SEVERITY.CRITICAL,
    status: ALERT_STATUS.IN_PROGRESS,
    session: 'dev_user_2 / 192.168.1.150',
    time: '1h ago',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    description: 'Potential data exfiltration detected',
  },
  {
    id: 'ALT_005',
    type: 'Brute Force Attempt',
    severity: ALERT_SEVERITY.HIGH,
    status: ALERT_STATUS.OPEN,
    session: 'unknown / 203.0.113.45',
    time: '2h ago',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    description: 'Multiple failed login attempts detected',
  },
];

export const mockSessions = [
  {
    id: 'VNCS_001',
    ip: '192.168.1.101',
    user: 'user_admin',
    transferred: 1245,
    score: 9.5,
    status: SESSION_STATUS.ACTIVE,
    startTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'VNCS_002',
    ip: '10.0.0.54',
    user: 'svc_backup',
    transferred: 780,
    score: 6.2,
    status: SESSION_STATUS.ACTIVE,
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'VNCS_003',
    ip: '172.16.30.12',
    user: 'user_guest',
    transferred: 150,
    score: 3.1,
    status: SESSION_STATUS.ACTIVE,
    startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'VNCS_004',
    ip: '192.168.1.205',
    user: 'dev_user_1',
    transferred: 450,
    score: 4.5,
    status: SESSION_STATUS.IDLE,
    startTime: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'VNCS_005',
    ip: '192.168.1.150',
    user: 'dev_user_2',
    transferred: 2100,
    score: 8.9,
    status: SESSION_STATUS.SUSPICIOUS,
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockFirewallRules = [
  {
    id: 'FW_001',
    ipAddress: '203.0.113.45',
    action: 'BLOCK',
    reason: 'Brute force attempt detected',
    status: FIREWALL_STATUS.ACTIVE,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'FW_002',
    ipAddress: '198.51.100.23',
    action: 'BLOCK',
    reason: 'Malicious activity detected',
    status: FIREWALL_STATUS.ACTIVE,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'FW_003',
    ipAddress: '192.0.2.100',
    action: 'BLOCK',
    reason: 'Data exfiltration attempt',
    status: FIREWALL_STATUS.PENDING,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 'FW_004',
    ipAddress: '203.0.113.89',
    action: 'BLOCK',
    reason: 'Unauthorized access attempt',
    status: FIREWALL_STATUS.FAILED,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockMetrics = {
  totalAlerts: 42,
  activeSessions: 5,
  blockedIPs: 26,
  riskScore: 7.2,
  dataTransferred: 4725,
  threatsBlocked: 15,
};

export const mockTrafficData = [
  { time: 'Mar 22', volume: 280 },
  { time: 'Mar 23', volume: 450 },
  { time: 'Mar 24', volume: 320 },
  { time: 'Mar 25', volume: 680 },
  { time: 'Mar 26', volume: 510 },
  { time: 'Today', volume: 720 },
];

export const mockSeverityDistribution = [
  { name: 'Critical', value: 5 },
  { name: 'High', value: 12 },
  { name: 'Medium', value: 18 },
  { name: 'Low', value: 7 },
];
