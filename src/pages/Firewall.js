import React, { useState } from 'react';
import { FiPlus, FiDownload, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { Card, Button, SearchBar, Dropdown, Table, Badge, ConfirmModal, SuccessModal, Modal, PermissionGate } from '../components/common';
import { useFirewallStore } from '../store';
import { formatDateTime } from '../utils';
import { FIREWALL_STATUS } from '../constants';
import { PERMISSIONS } from '../utils/permissions';

const Firewall = () => {
  const { filteredRules, filters, setFilters, statistics, updateRule, deleteRule, addRule } = useFirewallStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRule, setSelectedRule] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newRule, setNewRule] = useState({
    ipAddress: '',
    action: 'BLOCK',
    reason: '',
  });
  
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: FIREWALL_STATUS.ACTIVE, label: 'Active' },
    { value: FIREWALL_STATUS.INACTIVE, label: 'Inactive' },
    { value: FIREWALL_STATUS.PENDING, label: 'Pending' },
    { value: FIREWALL_STATUS.FAILED, label: 'Failed' },
  ];
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilters({ searchQuery: query });
  };
  
  const handleStatusFilter = (status) => {
    setFilters({ status: status || null });
  };

  const handleToggle = async () => {
    if (selectedRule) {
      const newStatus = selectedRule.status === FIREWALL_STATUS.ACTIVE 
        ? FIREWALL_STATUS.INACTIVE 
        : FIREWALL_STATUS.ACTIVE;
      updateRule(selectedRule.id, { status: newStatus });
      setShowToggleModal(false);
      setSuccessMessage(`Rule has been ${newStatus === FIREWALL_STATUS.ACTIVE ? 'enabled' : 'disabled'}.`);
      setShowSuccessModal(true);
    }
  };

  const handleDelete = async () => {
    if (selectedRule) {
      deleteRule(selectedRule.id);
      setShowDeleteModal(false);
      setSuccessMessage('Firewall rule has been deleted successfully.');
      setShowSuccessModal(true);
    }
  };

  const handleAddRule = async () => {
    if (newRule.ipAddress && newRule.reason) {
      addRule({
        ...newRule,
        status: FIREWALL_STATUS.ACTIVE,
        createdAt: new Date().toISOString(),
      });
      setShowAddModal(false);
      setNewRule({ ipAddress: '', action: 'BLOCK', reason: '' });
      setSuccessMessage('New firewall rule has been created successfully.');
      setShowSuccessModal(true);
    }
  };
  
  const columns = [
    {
      header: 'IP Address',
      accessor: 'ipAddress',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <span className="text-red-400 text-lg">🛡️</span>
          </div>
          <span className="text-white font-mono font-medium">{row.ipAddress}</span>
        </div>
      ),
    },
    {
      header: 'Action',
      accessor: 'action',
      render: (row) => (
        <Badge variant={row.action === 'BLOCK' ? 'error' : 'success'}>
          {row.action}
        </Badge>
      ),
    },
    {
      header: 'Reason',
      accessor: 'reason',
      render: (row) => <span className="text-gray-400">{row.reason}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge status={row.status}>{row.status}</Badge>,
    },
    {
      header: 'Created',
      accessor: 'createdAt',
      render: (row) => (
        <span className="text-gray-400 text-sm">
          {row.createdAt ? formatDateTime(row.createdAt) : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center justify-end gap-2 min-w-[100px]">
          {/* Toggle Rule - Admin+ */}
          <PermissionGate permission={PERMISSIONS.TOGGLE_FIREWALL_RULES}>
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                row.status === FIREWALL_STATUS.ACTIVE 
                  ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30' 
                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              } transition-all group relative`}
              onClick={() => {
                setSelectedRule(row);
                setShowToggleModal(true);
              }}
              title={row.status === FIREWALL_STATUS.ACTIVE ? 'Disable' : 'Enable'}
            >
              {row.status === FIREWALL_STATUS.ACTIVE ? (
                <FiToggleRight className="text-lg" />
              ) : (
                <FiToggleLeft className="text-lg" />
              )}
              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                {row.status === FIREWALL_STATUS.ACTIVE ? 'Disable Rule' : 'Enable Rule'}
              </span>
            </button>
          </PermissionGate>
          
          {/* Delete Rule - Admin+ */}
          <PermissionGate permission={PERMISSIONS.DELETE_FIREWALL_RULES}>
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all group relative"
              onClick={() => {
                setSelectedRule(row);
                setShowDeleteModal(true);
              }}
              title="Delete"
            >
              <FiTrash2 className="text-lg" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                Delete Rule
              </span>
            </button>
          </PermissionGate>
        </div>
      ),
    },
  ];
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Firewall Rules</h1>
          <p className="text-gray-400">Manage dynamic firewall rules and blocked IPs</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={FiDownload}>
            Export
          </Button>
          <PermissionGate permission={PERMISSIONS.ADD_FIREWALL_RULES}>
            <Button 
              variant="primary" 
              icon={FiPlus}
              onClick={() => setShowAddModal(true)}
            >
              Add Rule
            </Button>
          </PermissionGate>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Total Rules</div>
          <div className="text-white text-2xl font-bold">{statistics.total}</div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Active</div>
          <div className="text-green-400 text-2xl font-bold">{statistics.active}</div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Pending</div>
          <div className="text-yellow-400 text-2xl font-bold">{statistics.pending}</div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1b35] to-[#252642] rounded-lg p-4 border border-[#2a2c44]">
          <div className="text-gray-400 text-sm mb-1">Failed</div>
          <div className="text-red-400 text-2xl font-bold">{statistics.failed}</div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-gradient-to-br from-[#2a2842] via-[#1e1b35] to-[#16141f] rounded-xl border border-purple-500/20 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-gray-400 text-xs font-medium mb-2 block">Search Rules</label>
            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by IP address or reason..."
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
      
      {/* Rules Table */}
      <Card noPadding>
        <Table columns={columns} data={filteredRules} />
      </Card>

      {/* Add Rule Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Firewall Rule"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddRule}>
              Create Rule
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">IP Address *</label>
            <input
              type="text"
              value={newRule.ipAddress}
              onChange={(e) => setNewRule({ ...newRule, ipAddress: e.target.value })}
              placeholder="192.168.1.1"
              className="w-full px-4 py-2 bg-[#1a1b35] border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Action</label>
            <select
              value={newRule.action}
              onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
              className="w-full px-4 py-2 bg-[#1a1b35] border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="BLOCK">BLOCK</option>
              <option value="ALLOW">ALLOW</option>
              <option value="RATE_LIMIT">RATE_LIMIT</option>
            </select>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Reason *</label>
            <textarea
              value={newRule.reason}
              onChange={(e) => setNewRule({ ...newRule, reason: e.target.value })}
              placeholder="Reason for creating this rule..."
              rows={3}
              className="w-full px-4 py-2 bg-[#1a1b35] border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>
        </div>
      </Modal>

      {/* Toggle Confirmation Modal */}
      <ConfirmModal
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        onConfirm={handleToggle}
        title={`${selectedRule?.status === FIREWALL_STATUS.ACTIVE ? 'Disable' : 'Enable'} Rule`}
        message={`Are you sure you want to ${selectedRule?.status === FIREWALL_STATUS.ACTIVE ? 'disable' : 'enable'} the rule for IP ${selectedRule?.ipAddress}?`}
        confirmText={selectedRule?.status === FIREWALL_STATUS.ACTIVE ? 'Disable' : 'Enable'}
        type="warning"
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Firewall Rule"
        message={`Are you sure you want to delete the rule for IP ${selectedRule?.ipAddress}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
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

export default Firewall;
