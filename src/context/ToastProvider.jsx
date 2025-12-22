import React, { useState, useCallback } from 'react';
import { ToastContext } from './ToastContext';

/**
 * ToastProvider manages the state of active notifications.
 * It provides a way to trigger toasts from anywhere in the app tree.
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Removes a specific toast from the stack by its unique ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * showToast adds a new notification to the array.
   * Default duration is 5 seconds (5000ms).
   */
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now(); // Simple unique ID generation
    
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after timeout
    setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, toasts, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};