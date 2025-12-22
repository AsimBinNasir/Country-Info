import React, { useState, useEffect } from 'react';
import * as firebaseAuth from 'firebase/auth';
import { auth } from '../services/firebase';
import { AuthContext } from './AuthContext';

/**
 * AuthProvider wraps the application and handles the persistent 
 * authentication state from Firebase.
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // onAuthStateChanged is a listener that triggers whenever the user 
    // logs in, logs out, or the session is restored on refresh.
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    isAuthModalOpen,
    setAuthModalOpen,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Wait for loading to be false before rendering children. 
        This prevents protected routes from flashing guest content 
        while Firebase restores the session.
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
};