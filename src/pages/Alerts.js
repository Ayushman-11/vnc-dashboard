import React, { useState } from 'react';
import { FiFilter, FiDownload, FiCheckCircle, FiXCircle, FiEye, FiAlertTriangle } from 'react-icons/fi';
import { Card, Button, SearchBar, Dropdown, Table, Badge, ConfirmModal, SuccessModal, Modal, PermissionGate } from '../components/common';
import { useAlertStore } from '../store';
import { formatRelativeTime, formatDateTime } from '../utils';
import { ALERT_SEVERITY, ALERT_STATUS } from '../constants';
import { PERMISSIONS } from '../utils/permissions';

const Alerts = () => {
  const { filteredAlerts, filters, setFilters, summary, updateAlert } = useAlertStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showDismissModal, setShowDismissModal] = useState(false);
  const [showInvestigateModal, setShowInvestigateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const severityOptions = [
    { value: '', label: 'All Severities' },
    { value: ALERT_SEVERITY.CRITICAL, label: 'Critical' },
    { value: ALERT_SEVERITY.HIGH, label: 'High' },
    { value: ALERT_SEVERITY.MEDIUM, label: 'Medium' },
    { value: ALERT_SEVERITY.LOW, label: 'Low' },
  ];
  
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: ALERT_STATUS.OPEN, label: 'Open' },
    { value: ALERT_STATUS.IN_PROGRESS, label: 'In Progress' },
    { value: ALERT_STATUS.DISMISSED, label: 'Dismissed' },
    { value: ALERT_STATUS.RESOLVED, label: 'Resolved' },
  ];
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilters({ searchQuery: query });
  };
  
  const handleSeverityFilter = (severity) => {
    setFilters({ severity: severity || null });
  };
  
  const handleStatusFilter = (status) => {
    setFilters({ status: status || null });
  };

  const handleResolve = async () => {
    if (selectedAlert) {
      updateAlert(selectedAlert.id, { status: ALERT_STATUS.RESOLVED });
      setShowResolveModal(false);
      setSuccessMessage('Alert has been successfully resolved.');
      setShowSuccessModal(true);
    }
  };

  const handleDismiss = async () => {
    if (selectedAlert) {
      updateAlert(selectedAlert.id, { status: ALERT_STATUS.DISMISSED });
      setShowDismissModal(false);
      setSuccessMessage('Alert has been dismissed and marked as not relevant.');
      setShowSuccessModal(true);
    }
  };

  const handleInvestigate = async () => {
    if (selectedAlert) {
      updateAlert(selectedAlert.id, { status: ALERT_STATUS.IN_PROGRESS });
      setShowInvestigateModal(false);
      setSuccessMessage('Alert status changed to "In Progress".');
      setShowSuccessModal(true);
    }
  };

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
    setShowDetailsModal(true);
  };
  
  const columns = [
    {
      header: 'Alert Type',
      accessor: 'type',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <FiXCircle className="text-red-400" />
          </div>
          <div>
            <div className="text-white font-medium">{row.type}</div>
            <div className="text-gray-400 text-xs">{row.id}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Severity',
      accessor: 'severity',
      render: (row) => <Badge severity={row.severity}>{row.severity}</Badge>,
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge status={row.status}>{row.status}</Badge>,
    },
    {
      header: 'Session',
      accessor: 'session',
      render: (row) => <span className="text-gray-400 text-sm">{row.session}</span>,
    },
    {
      header: 'Time',
      accessor: 'time',
      render: (row) => (
        <span className="text-gray-400 text-sm">
          {row.time || formatRelativeTime(row.timestamp)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center justify-end gap-2 min-w-[180px]">
          {/* View - Always visible */}
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all group relative"
            onClick={() => handleViewDetails(row)}
            title="View Details"
          >
            <FiEye className="text-lg" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
              View Details
            </span>
          </button>
          
          {/* Investigate - Only for Open status - Analyst+ */}
          {row.status === ALERT_STATUS.OPEN ? (
            <PermissionGate 
              permission={PERMISSIONS.INVESTIGATE_ALERTS}
              fallback={<div className="w-10" />}
            >
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all group relative"
                onClick={() => {
                  setSelectedAlert(row);
                  setShowInvestigateModal(true);
                }}
                title="Investigate"
              >
                <FiAlertTriangle className="text-lg" />
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                  Investigate
                </span>
              </button>
            </PermissionGate>
          ) : (
            <div className="w-10" /> 
          )}
          
          {/* Resolve - For Open or In Progress - Analyst+ */}
          {(row.status === ALERT_STATUS.OPEN || row.status === ALERT_STATUS.IN_PROGRESS) ? (
            <PermissionGate 
              permission={PERMISSIONS.RESOLVE_ALERTS}
              fallback={<div className="w-10" />}
            >
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all group relative"
                onClick={() => {
                  setSelectedAlert(row);
                  setShowResolveModal(true);
                }}
                title="Resolve"
              >
                <FiCheckCircle className="text-lg" />
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                  Resolve
                </span>
              </button>
            </PermissionGate>
          ) : (
            <div className="w-10" />
          )}
          
          {/* Dismiss - For Open or In Progress - Analyst+ */}
          {(row.status !== ALERT_STATUS.DISMISSED && row.status !== ALERT_STATUS.RESOLVED) ? (
            <PermissionGate 
              permission={PERMISSIONS.DISMISS_ALERTS}
              fallback={<div className="w-10" />}
            >
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 transition-all group relative"
                onClick={() => {
                  setSelectedAlert(row);
                  setShowDismissModal(true);
                }}
                title="Dismiss"
              >
                <FiXCircle className="text-lg" />
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                  Dismiss
                </span>
              </button>
            </PermissionGate>
          ) : (
            <div className="w-10" />
          )}
        </div>
      ),
    },
  ];
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Security Alerts</h1>
          <p className="text-gray-400">Monitor and respond to security events</p>
        </div>
        <Button variant="secondary" icon={FiDownload}>
          Export
        </Button>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Open Alerts</div>
          <div className="text-red-400 text-2xl font-bold">{summary.open}</div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">In Progress</div>
          <div className="text-yellow-400 text-2xl font-bold">{summary.inProgress}</div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Resolved</div>
          <div className="text-green-400 text-2xl font-bold">{summary.resolved}</div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Dismissed</div>
          <div className="text-gray-400 text-2xl font-bold">{summary.dismissed}</div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-gradient-to-br from-[#2a2842] via-[#1e1b35] to-[#16141f] rounded-xl border border-purple-500/20 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-gray-400 text-xs font-medium mb-2 block">Search Alerts</label>
            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search alerts by type, session, or description..."
            />
          </div>
          <div className="w-56">
            <label className="text-gray-400 text-xs font-medium mb-2 block">Severity</label>
            <Dropdown
              value={filters.severity || ''}
              onChange={handleSeverityFilter}
              options={severityOptions}
            />
          </div>
          <div className="w-56">
            <label className="text-gray-400 text-xs font-medium mb-2 block">Status</label>
            <Dropdown
              value={filters.status || ''}
              onChange={handleStatusFilter}
              options={statusOptions}
            />
          </div>
        </div>
      </div>
      
      {/* Alerts Table */}
      <Card noPadding>
        <Table columns={columns} data={filteredAlerts} />
      </Card>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title="Alert Details"
          size="lg"
          footer={
            <div className="flex gap-2">
              {selectedAlert.status !== ALERT_STATUS.RESOLVED && (
                <Button 
                  variant="success" 
                  icon={FiCheckCircle}
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowResolveModal(true);
                  }}
                >
                  Resolve
                </Button>
              )}
              <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 text-sm mb-1">Alert ID</div>
                <div className="text-white font-mono text-sm">{selectedAlert.id}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Type</div>
                <div className="text-white font-medium">{selectedAlert.type}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Severity</div>
                <Badge severity={selectedAlert.severity}>{selectedAlert.severity}</Badge>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Status</div>
                <Badge status={selectedAlert.status}>{selectedAlert.status}</Badge>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Session</div>
                <div className="text-white font-mono text-sm">{selectedAlert.session}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Time</div>
                <div className="text-white text-sm">
                  {selectedAlert.timestamp ? formatDateTime(selectedAlert.timestamp) : selectedAlert.time}
                </div>
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-2">Description</div>
              <div className="bg-[#1a1b35] rounded-lg p-4 text-gray-300 text-sm">
                {selectedAlert.description || 'No detailed description available for this alert.'}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Resolve Confirmation Modal */}
      <ConfirmModal
        isOpen={showResolveModal}
        onClose={() => setShowResolveModal(false)}
        onConfirm={handleResolve}
        title="Resolve Alert"
        message={`Are you sure you want to mark alert "${selectedAlert?.type}" as resolved?`}
        confirmText="Resolve"
        type="success"
      />

      {/* Dismiss Confirmation Modal */}
      <ConfirmModal
        isOpen={showDismissModal}
        onClose={() => setShowDismissModal(false)}
        onConfirm={handleDismiss}
        title="Dismiss Alert"
        message={`Are you sure you want to dismiss alert "${selectedAlert?.type}"? The alert will be marked as not relevant but will remain in the system for audit purposes.`}
        confirmText="Dismiss"
        type="warning"
      />

      {/* Investigate Confirmation Modal */}
      <ConfirmModal
        isOpen={showInvestigateModal}
        onClose={() => setShowInvestigateModal(false)}
        onConfirm={handleInvestigate}
        title="Investigate Alert"
        message={`Mark alert "${selectedAlert?.type}" as "In Progress" to indicate active investigation?`}
        confirmText="Start Investigation"
        type="info"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
        message={successMessage}
      />
    </div>
  );
};

export default Alerts;