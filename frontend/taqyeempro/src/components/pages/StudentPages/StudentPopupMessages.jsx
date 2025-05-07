import React, { useState } from 'react';
import { XCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const popupStyles = {
  success: 'bg-green-100 text-green-700 border-green-300',
  error: 'bg-red-100 text-red-700 border-red-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  info: 'bg-blue-100 text-blue-700 border-blue-300',
};

const icons = {
  success: <CheckCircle className="w-5 h-5 mr-2 text-green-600" />,
  error: <XCircle className="w-5 h-5 mr-2 text-red-600" />,
  warning: <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />,
  info: <Info className="w-5 h-5 mr-2 text-blue-600" />,
};

const StudentPopupMessages = ({ type = 'info', message, onClose }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg shadow-sm max-w-sm ${popupStyles[type]}`}
    >
      <div className="flex items-center">
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button onClick={onClose}>
        <XCircle className="w-4 h-4 text-gray-500 hover:text-gray-800" />
      </button>
    </div>
  );
};

export default StudentPopupMessages;
