import React, { useState } from 'react';
import { FiFilter, FiDownload, FiMoreVertical, FiEye, FiX, FiShield } from 'react-icons/fi';
import { Card, Button, SearchBar, Dropdown, Table, Badge, ConfirmModal, SuccessModal, Modal } from '../components/common';
import { useSessionStore } from '../store';
import { formatDateTime, formatBytes, getRiskScoreColor } from '../utils';
import { SESSION_STATUS } from '../constants';

const Sessions = () => {
  const { filteredSessions, filters, setFilters, statistics, terminateSession } = useSessionStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: SESSION_STATUS.ACTIVE, label: 'Active' },
    { value: SESSION_STATUS.IDLE, label: 'Idle' },
    { value: SESSION_STATUS.SUSPICIOUS, label: 'Suspicious' },
    { value: SESSION_STATUS.TERMINATED, label: 'Terminated' },
  ];
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilters({ searchQuery: query });
  };
  
  const handleStatusFilter = (status) => {
    setFilters({ status: status || null });
  };

  const handleTerminate = async () => {
    if (selectedSession) {
      await terminateSession(selectedSession.id);
      setShowTerminateModal(false);
      setShowSuccessModal(true);
      setShowActionsMenu(null);
    }
  };

  const handleViewDetails = (session) => {
    setSelectedSession(session);
    setShowDetailsModal(true);
    setShowActionsMenu(null);
  };

  const handleBlockIP = (session) => {
    // In real app, this would call firewall service
    alert(`IP ${session.ip} would be blocked`);
    setShowActionsMenu(null);
  };
  
  const columns = [
    {
      header: 'Session ID',
      accessor: 'id',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <span className="text-purple-400 text-sm font-semibold">VNC</span>
          </div>
          <span className="text-white font-medium">{row.id}</span>
        </div>
      ),
    },
    {
      header: 'User',
      accessor: 'user',
      render: (row) => <span className="text-white">{row.user}</span>,
    },
    {
      header: 'IP Address',
      accessor: 'ip',
      render: (row) => <span className="text-gray-400 font-mono text-sm">{row.ip}</span>,
    },
    {
      header: 'Data Transferred',
      accessor: 'transferred',
      render: (row) => (
        <span className="text-white">{formatBytes(row.transferred * 1024 * 1024)}</span>
      ),
    },
    {
      header: 'Risk Score',
      accessor: 'score',
      render: (row) => (
        <span className={`font-bold text-lg ${getRiskScoreColor(row.score)}`}>
          {row.score.toFixed(1)}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge status={row.status}>{row.status}</Badge>,
    },
    {
      header: 'Started',
      accessor: 'startTime',
      render: (row) => (
        <span className="text-gray-400 text-sm">
          {row.startTime ? formatDateTime(row.startTime) : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center justify-end gap-2 min-w-[140px]">
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
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all group relative"
            onClick={() => handleBlockIP(row)}
            title="Block IP"
          >
            <FiShield className="text-lg" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
              Block IP
            </span>
          </button>
          {row.status !== 'Terminated' && (
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all group relative"
              onClick={() => {
                setSelectedSession(row);
                setShowTerminateModal(true);
              }}
              title="Terminate Session"
            >
              <FiX className="text-lg" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                Terminate
              </span>
            </button>
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
          <h1 className="text-3xl font-bold text-white mb-2">VNC Sessions</h1>
          <p className="text-gray-400">Monitor and manage active VNC connections</p>
        </div>
        <Button variant="secondary" icon={FiDownload}>
          Export
        </Button>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Total Sessions</div>
          <div className="text-white text-2xl font-bold">{statistics.total}</div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Active</div>
          <div className="text-green-400 text-2xl font-bold">{statistics.active}</div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Suspicious</div>
          <div className="text-orange-400 text-2xl font-bold">{statistics.suspicious}</div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Data Transferred</div>
          <div className="text-white text-2xl font-bold">
            {formatBytes(statistics.totalDataTransferred * 1024 * 1024)}
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-gradient-to-br from-[#2a2842] via-[#1e1b35] to-[#16141f] rounded-xl border border-purple-500/20 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-gray-400 text-xs font-medium mb-2 block">Search Sessions</label>
            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by session ID, user, or IP..."
            />
          </div>
          <div className="w-64">
            <label className="text-gray-400 text-xs font-medium mb-2 block">Filter by Status</label>
            <Dropdown
              value={filters.status || ''}
              onChange={handleStatusFilter}
              options={statusOptions}
            />
          </div>
        </div>
      </div>
      
      {/* Sessions Table */}
      <Card noPadding>
        <Table columns={columns} data={filteredSessions} />
      </Card>

      {/* Session Details Modal */}
      {selectedSession && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title="Session Details"
          size="lg"
          footer={
            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 text-sm mb-1">Session ID</div>
                <div className="text-white font-medium">{selectedSession.id}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">User</div>
                <div className="text-white font-medium">{selectedSession.user}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">IP Address</div>
                <div className="text-white font-mono">{selectedSession.ip}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Status</div>
                <Badge status={selectedSession.status}>{selectedSession.status}</Badge>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Risk Score</div>
                <div className={`font-bold text-2xl ${getRiskScoreColor(selectedSession.score)}`}>
                  {selectedSession.score.toFixed(1)}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Data Transferred</div>
                <div className="text-white font-medium">
                  {formatBytes(selectedSession.transferred * 1024 * 1024)}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Started</div>
                <div className="text-white text-sm">
                  {selectedSession.startTime ? formatDateTime(selectedSession.startTime) : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Duration</div>
                <div className="text-white text-sm">
                  {selectedSession.duration || 'Ongoing'}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Terminate Confirmation Modal */}
      <ConfirmModal
        isOpen={showTerminateModal}
        onClose={() => setShowTerminateModal(false)}
        onConfirm={handleTerminate}
        title="Terminate Session"
        message={`Are you sure you want to terminate session ${selectedSession?.id}? This will immediately disconnect the user.`}
        confirmText="Terminate"
        type="danger"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Session Terminated"
        message="The VNC session has been successfully terminated."
      />
    </div>
  );
};

export default Sessions;
