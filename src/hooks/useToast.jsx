import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

/**
 * Custom hook to access the Toast context.
 * Provides functions like showToast() to the rest of the application.
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  // Safety check to ensure hook is used within the correct context provider
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};