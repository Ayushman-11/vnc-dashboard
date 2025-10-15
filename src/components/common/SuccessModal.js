import React, { useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import Modal from './Modal';
import Button from './Button';

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title = 'Success',
  message,
  autoClose = true,
  autoCloseDelay = 2000
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <FiCheckCircle className="text-4xl text-green-400" />
        </div>
        <p className="text-gray-300 text-center text-sm leading-relaxed">
          {message}
        </p>
      </div>
    </Modal>
  );
};

export default SuccessModal;
