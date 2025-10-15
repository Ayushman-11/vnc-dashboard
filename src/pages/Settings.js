import React, { useState } from 'react';
import { 
  FiSave, 
  FiUser, 
  FiBell, 
  FiSettings, 
  FiShield, 
  FiAlertTriangle,
  FiLock,
  FiZap,
  FiEye,
  FiHardDrive,
  FiFileText,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { Card, Button, PermissionGate } from '../components/common';
import { useAuth, usePermissions } from '../hooks';
import { PERMISSIONS } from '../utils/permissions';

const Settings = () => {
  const { user, role } = useAuth();
  const { can } = usePermissions();

  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    notifications: false,
    detectionRules: false,
    firewallConfig: false,
    integrations: false,
    personalization: false,
    security: false,
    backupRestore: false,
    auditLogs: false,
  });

  // Profile Settings (General)
  const [profileData, setProfileData] = useState({
    name: user?.fullName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    timezone: 'UTC',
    language: 'English',
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    slackNotifications: false,
    webhookNotifications: false,
    desktopNotifications: true,
    criticalAlerts: true,
    highAlerts: true,
    mediumAlerts: false,
    lowAlerts: false,
  });

  // Detection Rules
  const [detectionRules, setDetectionRules] = useState({
    enableBruteForceDetection: true,
    enablePortScanDetection: true,
    enableDataExfiltration: true,
    enableAnomalyDetection: false,
    bruteForceThreshold: '5',
    portScanThreshold: '10',
  });

  // Firewall Config
  const [firewallConfig, setFirewallConfig] = useState({
    enableAutoBlock: true,
    blockDuration: '24',
    whitelistEnabled: true,
    blacklistEnabled: true,
    geoBlocking: false,
  });

  // Integrations
  const [integrations, setIntegrations] = useState({
    slackWebhook: '',
    teamsWebhook: '',
    splunkHost: '',
    sentinelWorkspace: '',
  });

  // Personalization
  const [personalization, setPersonalization] = useState({
    theme: 'dark',
    compactView: false,
    showWelcomeMessage: true,
    defaultPage: 'dashboard',
  });

  // Security
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '30',
    enableTwoFactor: false,
    enableIPWhitelist: false,
    passwordExpiry: '90',
  });

  // Backup & Restore
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: '30',
    includeAlerts: true,
    includeRules: true,
    includeSessions: true,
  });

  // Alert Configuration - For Alert Config Section
  const [alertConfig, setAlertConfig] = useState({
    emailNotifications: true,
    slackNotifications: false,
    criticalAlerts: true,
    highAlerts: true,
    mediumAlerts: false,
    lowAlerts: false,
    alertRetention: '90',
  });

  // System Configuration - For System Config Section
  const [systemConfig, setSystemConfig] = useState({
    sessionTimeout: '30',
    maxConcurrentSessions: '50',
    enableAuditLog: true,
    enableTwoFactor: false,
    dataRetention: '365',
    backupFrequency: 'daily',
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = (section) => {
    console.log(`Saving ${section} settings`);
    alert(`${section} settings saved successfully!`);
  };

  const handleProfileSave = () => {
    console.log('Saving profile:', profileData);
    alert('Profile settings saved successfully!');
  };

  const handleAlertConfigSave = () => {
    console.log('Saving alert config:', alertConfig);
    alert('Alert configuration saved successfully!');
  };

  const handleSystemConfigSave = () => {
    console.log('Saving system config:', systemConfig);
    alert('System configuration saved successfully!');
  };

  // Section Header Component
  const SectionHeader = ({ icon: Icon, title, section, gradient, permissionRequired = null }) => {
    const content = (
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1f2041] transition-colors rounded-t-lg"
        onClick={() => toggleSection(section)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <Icon className="text-white text-xl" />
          </div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        {expandedSections[section] ? (
          <FiChevronUp className="text-gray-400 text-xl" />
        ) : (
          <FiChevronDown className="text-gray-400 text-xl" />
        )}
      </div>
    );

    return permissionRequired ? (
      <PermissionGate permission={permissionRequired}>
        {content}
      </PermissionGate>
    ) : content;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your preferences and system configuration</p>
      </div>


      {/* Profile Settings - Available to all users */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <FiUser className="text-purple-400 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
            <p className="text-sm text-gray-400">Manage your personal information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed here. Update in Clerk Dashboard.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Timezone
              </label>
              <select
                value={profileData.timezone}
                onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST (Eastern)</option>
                <option value="PST">PST (Pacific)</option>
                <option value="CST">CST (Central)</option>
                <option value="MST">MST (Mountain)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Language
              </label>
              <select
                value={profileData.language}
                onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="primary" icon={FiSave} onClick={handleProfileSave}>
              Save Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Alert Configuration - Admin+ */}
      <PermissionGate permission={PERMISSIONS.CONFIGURE_ALERTS}>
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <FiBell className="text-orange-400 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Alert Configuration</h2>
              <p className="text-sm text-gray-400">Configure alert notifications and preferences</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Notification Channels */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Notification Channels</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-[#1a1b35] rounded-lg cursor-pointer hover:bg-[#1f2041] transition-colors">
                  <span className="text-gray-300">Email Notifications</span>
                  <input
                    type="checkbox"
                    checked={alertConfig.emailNotifications}
                    onChange={(e) => setAlertConfig({ ...alertConfig, emailNotifications: e.target.checked })}
                    className="w-5 h-5 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-[#1a1b35] rounded-lg cursor-pointer hover:bg-[#1f2041] transition-colors">
                  <span className="text-gray-300">Slack Notifications</span>
                  <input
                    type="checkbox"
                    checked={alertConfig.slackNotifications}
                    onChange={(e) => setAlertConfig({ ...alertConfig, slackNotifications: e.target.checked })}
                    className="w-5 h-5 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                </label>
              </div>
            </div>

            {/* Alert Severity Filters */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Alert Severity Filters</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center justify-between p-3 bg-[#1a1b35] rounded-lg cursor-pointer hover:bg-[#1f2041] transition-colors">
                  <span className="text-red-400 text-sm">Critical</span>
                  <input
                    type="checkbox"
                    checked={alertConfig.criticalAlerts}
                    onChange={(e) => setAlertConfig({ ...alertConfig, criticalAlerts: e.target.checked })}
                    className="w-4 h-4 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-[#1a1b35] rounded-lg cursor-pointer hover:bg-[#1f2041] transition-colors">
                  <span className="text-orange-400 text-sm">High</span>
                  <input
                    type="checkbox"
                    checked={alertConfig.highAlerts}
                    onChange={(e) => setAlertConfig({ ...alertConfig, highAlerts: e.target.checked })}
                    className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-[#1a1b35] rounded-lg cursor-pointer hover:bg-[#1f2041] transition-colors">
                  <span className="text-yellow-400 text-sm">Medium</span>
                  <input
                    type="checkbox"
                    checked={alertConfig.mediumAlerts}
                    onChange={(e) => setAlertConfig({ ...alertConfig, mediumAlerts: e.target.checked })}
                    className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-[#1a1b35] rounded-lg cursor-pointer hover:bg-[#1f2041] transition-colors">
                  <span className="text-blue-400 text-sm">Low</span>
                  <input
                    type="checkbox"
                    checked={alertConfig.lowAlerts}
                    onChange={(e) => setAlertConfig({ ...alertConfig, lowAlerts: e.target.checked })}
                    className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>

            {/* Data Retention */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Alert Retention Period (days)
              </label>
              <select
                value={alertConfig.alertRetention}
                onChange={(e) => setAlertConfig({ ...alertConfig, alertRetention: e.target.value })}
                className="w-full md:w-64 px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="primary" icon={FiSave} onClick={handleAlertConfigSave}>
                Save Alert Configuration
              </Button>
            </div>
          </div>
        </Card>
      </PermissionGate>

      {/* System Configuration - Super Admin Only */}
      <PermissionGate permission={PERMISSIONS.CONFIGURE_SYSTEM}>
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <FiShield className="text-red-400 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">System Configuration</h2>
              <p className="text-sm text-gray-400">Advanced system settings (Super Admin only)</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={systemConfig.sessionTimeout}
                  onChange={(e) => setSystemConfig({ ...systemConfig, sessionTimeout: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  min="5"
                  max="1440"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Concurrent Sessions
                </label>
                <input
                  type="number"
                  value={systemConfig.maxConcurrentSessions}
                  onChange={(e) => setSystemConfig({ ...systemConfig, maxConcurrentSessions: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  min="1"
                  max="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data Retention Period (days)
                </label>
                <select
                  value={systemConfig.dataRetention}
                  onChange={(e) => setSystemConfig({ ...systemConfig, dataRetention: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                  <option value="730">2 years</option>
                  <option value="1825">5 years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Backup Frequency
                </label>
                <select
                  value={systemConfig.backupFrequency}
                  onChange={(e) => setSystemConfig({ ...systemConfig, backupFrequency: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* Security Options */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center justify-between p-3 bg-[#1a1b35] rounded-lg cursor-pointer hover:bg-[#1f2041] transition-colors">
                <div>
                  <span className="text-gray-300 block">Enable Audit Logging</span>
                  <span className="text-xs text-gray-500">Track all system actions and changes</span>
                </div>
                <input
                  type="checkbox"
                  checked={systemConfig.enableAuditLog}
                  onChange={(e) => setSystemConfig({ ...systemConfig, enableAuditLog: e.target.checked })}
                  className="w-5 h-5 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-[#1a1b35] rounded-lg cursor-pointer hover:bg-[#1f2041] transition-colors">
                <div>
                  <span className="text-gray-300 block">Require Two-Factor Authentication</span>
                  <span className="text-xs text-gray-500">Enforce 2FA for all users</span>
                </div>
                <input
                  type="checkbox"
                  checked={systemConfig.enableTwoFactor}
                  onChange={(e) => setSystemConfig({ ...systemConfig, enableTwoFactor: e.target.checked })}
                  className="w-5 h-5 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
              </label>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="primary" icon={FiSave} onClick={handleSystemConfigSave}>
                Save System Configuration
              </Button>
            </div>
          </div>
        </Card>
      </PermissionGate>
    </div>
  );
};

export default Settings;
