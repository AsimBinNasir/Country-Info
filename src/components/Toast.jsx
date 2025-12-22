import React from 'react';
import { useToast } from '../hooks/useToast';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

/**
 * Toast Container Component
 * Renders a stack of notifications in the top-right corner.
 */
const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-200 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto relative flex items-center gap-4 min-w-[320px] max-w-md p-4 rounded-2xl shadow-2xl border bg-white dark:bg-blue-900 animate-in slide-in-from-right-full duration-500 ${
            toast.type === 'success' ? 'border-green-100 dark:border-green-900/30' : 
            toast.type === 'error' ? 'border-red-100 dark:border-red-900/30' : 
            'border-blue-100 dark:border-blue-900/30'
          }`}
        >
          <div className={`p-2 rounded-xl ${
            toast.type === 'success' ? 'bg-green-50 text-green-600' : 
            toast.type === 'error' ? 'bg-red-50 text-red-600' : 
            'bg-blue-50 text-blue-600'
          }`}>
            {toast.type === 'success' && <FaCheckCircle className="text-xl" />}
            {toast.type === 'error' && <FaExclamationCircle className="text-xl" />}
            {toast.type === 'info' && <FaInfoCircle className="text-xl" />}
          </div>
          
          <div className="flex-1">
            <p className="text-sm font-black text-gray-950 dark:text-white leading-snug">
              {toast.message}
            </p>
          </div>

          <button 
            onClick={() => removeToast(toast.id)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
          
          {/* Progress Bar Visual Timer */}
          <div 
            className="absolute bottom-0 left-0 h-1 opacity-20 rounded-b-2xl animate-[progress_5s_linear_forwards]" 
            style={{ 
              backgroundColor: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : '#3b82f6' 
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;