import { createContext } from 'react';

// Create the context with default values
export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
});