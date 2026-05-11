import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  const iconMap = {
    success: <CheckCircle className="text-green-400" size={20} />,
    error: <XCircle className="text-red-400" size={20} />,
    info: <Info className="text-arc-blue" size={20} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.8 }}
      className="glass px-6 py-4 rounded-2xl flex items-center gap-4 min-w-[300px] border-white/10 shadow-2xl"
    >
      <div className="shrink-0">{iconMap[type]}</div>
      <div className="flex-1">
        <div className="text-sm font-bold">{type === 'success' ? 'Success' : 'Notification'}</div>
        <div className="text-xs text-gray-400">{message}</div>
      </div>
      <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
        <X size={16} />
      </button>
    </motion.div>
  );
};

export default Toast;
