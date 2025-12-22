import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FaTimes } from 'react-icons/fa';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

/**
 * AuthModal acts as the central hub for authentication.
 * It toggles between Login and Registration views.
 */
const AuthModal = () => {
  const { isAuthModalOpen, setAuthModalOpen } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Synchronize DOM (body scroll) with modal state
  // We removed the setIsLogin(true) from here to follow React best practices
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setAuthModalOpen(false);
    // Reset the view to login after the modal closes
    // This happens in an event handler, which is the correct place for state transitions
    setIsLogin(true);
  };

  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6 bg-gray-950/70 backdrop-blur-md animate-in fade-in duration-300"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-blue-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-blue-800 overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer z-10"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
          {isLogin ? (
            <SignInForm 
              onSuccess={handleClose} 
              onSwitchToSignUp={() => setIsLogin(false)} 
            />
          ) : (
            <SignUpForm 
              onSuccess={handleClose} 
              onSwitchToSignIn={() => setIsLogin(true)} 
            />
          )}
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;