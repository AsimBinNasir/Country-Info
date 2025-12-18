import React, { useState } from 'react';
import LoadingPage from '../components/LoadingPage';
import { LoadingContext } from './LoadingContext';

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {/* This conditional rendering ensures the loader sits on top 
        of all other content when isLoading is true.
      */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-blue-950 transition-colors duration-300">
            <LoadingPage />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};