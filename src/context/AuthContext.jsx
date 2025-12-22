import { createContext } from 'react';

/**
 * AuthContext stores the current user's session state and 
 * manages the global authentication modal visibility.
 */
export const AuthContext = createContext({
  currentUser: null,
  loading: true,
  isAuthModalOpen: false,
  setAuthModalOpen: () => {},
});