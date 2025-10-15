import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, ConfirmModal, SuccessModal } from '../common';
import { FiAlertTriangle, FiMoreVertical, FiEye, FiX } from 'react-icons/fi';
import { getRiskScoreColor } from '../../utils';
import { useSessionStore } from '../../store';

const SessionsTable = ({ sessions = [] }) => {
  const navigate = useNavigate();
  const { terminateSession } = useSessionStore();
  const [selectedSession, setSelectedSession] = useState(null);
  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);

  const handleTerminate = async () => {
    if (selectedSession) {
      await terminateSession(selectedSession.id);
      setShowTerminateModal(false);
      setShowSuccessModal(true);
      setShowActionsMenu(null);
    }
  };

  const handleViewDetails = (session) => {
    navigate('/sessions', { state: { selectedSession: session } });
  };

  const columns = [
    {
      header: 'Asset',
      accessor: 'id',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <span className="text-purple-400 text-xs font-semibold">VNC</span>
          </div>
          <div>
            <div className="text-white font-medium text-sm">{row.id}</div>
            <div className="text-gray-400 text-xs">{row.user}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Account',
      accessor: 'user',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center">
            <span className="text-blue-400 text-xs">🔐</span>
          </div>
          <span className="text-white text-sm">{row.user}</span>
        </div>
      ),
    },
    {
      header: 'Risk Score',
      accessor: 'score',
      render: (row) => (
        <span className={`font-semibold ${getRiskScoreColor(row.score)}`}>
          {row.score.toFixed(1)}
        </span>
      ),
    },
    {
      header: 'Inventory Alerts',
      accessor: 'transferred',
      render: (row) => (
        <div className="flex items-center gap-2">
          <FiAlertTriangle className="text-orange-400" />
          <span className="text-white">{row.transferred} MB</span>
        </div>
      ),
    },
    {
      header: 'Action',
      accessor: 'action',
      render: (row) => (
        <div className="relative">
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => setShowActionsMenu(showActionsMenu === row.id ? null : row.id)}
          >
            <FiMoreVertical />
          </button>
          
          {showActionsMenu === row.id && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2a2c44] border border-purple-500/30 rounded-lg shadow-xl z-10">
              <button
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-purple-500/20 transition-colors flex items-center gap-2"
                onClick={() => {
                  handleViewDetails(row);
                  setShowActionsMenu(null);
                }}
              >
                <FiEye /> View Details
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-2"
                onClick={() => {
                  setSelectedSession(row);
                  setShowTerminateModal(true);
                  setShowActionsMenu(null);
                }}
              >
                <FiX /> Terminate Session
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  
  return (
    <>
      <Card 
        title="Riskiest AI & Machine Learning Assets" 
        subtitle="High-risk VNC sessions"
        actions
        noPadding
        gradient="pink"
      >
        <div className="px-6 pb-6">
          <Table columns={columns} data={sessions.slice(0, 4)} />
        </div>
      </Card>

      {/* Terminate Confirmation Modal */}
      <ConfirmModal
        isOpen={showTerminateModal}
        onClose={() => setShowTerminateModal(false)}
        onConfirm={handleTerminate}
        title="Terminate Session"
        message={`Are you sure you want to terminate session ${selectedSession?.id}? This action cannot be undone.`}
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
    </>
  );
};

export default SessionsTable;
