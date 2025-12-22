import { createContext } from 'react';

/**
 * ToastContext serves as the blueprint for our notification system.
 * We initialize it with null/undefined as the ToastProvider 
 * will provide the actual implementation.
 */
export const ToastContext = createContext(undefined);