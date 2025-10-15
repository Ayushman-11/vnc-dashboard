import React from 'react';
import { FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import Modal from './Modal';
import Button from './Button';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning', // warning, danger, info, success
  isLoading = false
}) => {
  const icons = {
    warning: { Icon: FiAlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/20' },
    danger: { Icon: FiAlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20' },
    info: { Icon: FiInfo, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    success: { Icon: FiCheckCircle, color: 'text-green-400', bg: 'bg-green-500/20' }
  };

  const { Icon, color, bg } = icons[type];

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button 
            variant={type === 'danger' ? 'danger' : 'primary'} 
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`text-xl ${color}`} />
        </div>
        <div className="flex-1">
          <p className="text-gray-300 text-sm leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
