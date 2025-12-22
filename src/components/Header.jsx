import React, { useState } from 'react';
import { FaRegUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { IoMoonOutline, IoMoon } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { logoutUser } from '../services/authService';

/**
 * Header Component
 * Handles navigation, theme toggling, and user authentication display.
 */
const Header = ({ onHomeClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { currentUser, setAuthModalOpen } = useAuth();
  const { showToast } = useToast();

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      navigate('/');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      showToast("Successfully logged out. See you again soon!", "success");
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      // Fixed: Logging the error to satisfy ESLint and aid debugging
      console.error("Logout Error:", error);
      showToast("Logout failed. Please try again.", "error");
    }
  };

  const openAuth = () => {
    setAuthModalOpen(true);
    setIsOpen(false);
  };

  /**
   * Prioritize locally stored name (e.g., from a registration form)
   * Fallback to Firebase displayName or email prefix.
   */
  const getDisplayName = () => {
    if (!currentUser) return '';
    const localName = localStorage.getItem('explorer_username');
    return localName || currentUser.displayName || currentUser.email?.split('@')[0];
  };

  const userDisplayName = getDisplayName();

  return (
    <nav className='relative z-30'>
      {/* Main Navbar */}
      <div className='h-auto w-full px-6 py-5 sm:px-10 sm:py-7 md:px-12 lg:px-15 xl:px-25 lg:py-7 bg-white dark:bg-blue-900 transition-colors duration-300 flex items-center justify-between drop-shadow-md'>
        <h1 
          onClick={handleHomeClick}
          className='font-nunitosans font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-950 dark:text-white cursor-pointer select-none transition-colors duration-300'>
          Where in the world?
        </h1>

        {/* Mobile Hamburger */}
        <div className='flex items-center gap-4 md:hidden'>
          <GiHamburgerMenu
            className='text-gray-950 dark:text-white text-2xl cursor-pointer transition-colors duration-300'
            onClick={toggleMenu}
          />
        </div>

        {/* Desktop Controls */}
        <div className='hidden md:flex items-center gap-7'>
          {currentUser ? (
            <div className='flex items-center gap-4 group relative'>
              <div className='flex items-center gap-2.5 text-gray-950 dark:text-white bg-gray-50 dark:bg-blue-950/50 px-4 py-2 rounded-full border border-gray-100 dark:border-blue-800 shadow-sm'>
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="User profile" 
                    className='w-7 h-7 rounded-full border border-white dark:border-blue-900 object-cover shadow-sm' 
                  />
                ) : (
                  <FaRegUserCircle className='text-2xl opacity-70' />
                )}
                <span className='font-black text-xs max-w-[120px] truncate tracking-tight'>
                  {userDisplayName}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className='flex items-center gap-1.5 text-xs font-black text-red-500 hover:text-red-600 transition-colors cursor-pointer px-2'
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={openAuth}
              className='flex items-center gap-2 text-gray-950 dark:text-white font-black hover:opacity-70 transition-opacity cursor-pointer bg-blue-50 dark:bg-blue-800/30 px-6 py-2.5 rounded-full'
            >
              <FaSignInAlt className="text-blue-600" /> Sign In
            </button>
          )}

          {/* Theme Toggler */}
          <div className='flex items-center gap-2 cursor-pointer select-none' onClick={toggleTheme}>
            {theme === 'light' ? (
                <IoMoonOutline className='text-gray-950 dark:text-white text-2xl transition-colors duration-300' />
            ) : (
                <IoMoon className='text-white text-2xl transition-colors duration-300' />
            )}
            <div className='font-nunitosans font-bold text-xl text-gray-950 dark:text-white transition-colors duration-300'>
              Dark Mode
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div 
          className='fixed inset-0 bg-black/50 z-40'
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-screen w-3/4 bg-white dark:bg-blue-900 z-50 transform transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className='flex flex-col p-6 gap-8'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-black text-gray-950 dark:text-white tracking-tight'>Menu</h2>
            <button onClick={toggleMenu} className='text-gray-950 dark:text-white font-bold text-xl'>&times;</button>
          </div>

          {currentUser ? (
            <div className='flex flex-col gap-6 bg-gray-50 dark:bg-blue-950/40 p-5 rounded-3xl border border-gray-100 dark:border-blue-800'>
              <div className='flex items-center gap-4'>
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="User profile" className='w-12 h-12 rounded-full border-2 border-white dark:border-blue-900' />
                ) : (
                  <FaRegUserCircle className='text-gray-950 dark:text-white text-4xl' />
                )}
                <div className='flex flex-col overflow-hidden'>
                  <span className='font-nunitosans font-black text-lg text-gray-950 dark:text-white truncate'>
                    {userDisplayName}
                  </span>
                  <span className='text-xs text-gray-400 font-bold truncate'>{currentUser.email}</span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className='flex items-center justify-center gap-3 bg-red-50 dark:bg-red-950/30 py-3 rounded-xl text-red-500 font-black text-sm'
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-4 cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-blue-800/20 rounded-2xl transition-colors' onClick={openAuth}>
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                <FaSignInAlt className='text-blue-600' />
              </div>
              <span className='font-nunitosans font-black text-lg text-gray-950 dark:text-white'>Sign In</span>
            </div>
          )}

          <div className='flex items-center gap-4 cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-blue-800/20 rounded-2xl transition-colors' onClick={() => { toggleTheme(); toggleMenu(); }}>
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-blue-800/50 flex items-center justify-center">
              {theme === 'light' ? (
                  <IoMoonOutline className='text-gray-950 dark:text-white text-xl' />
              ) : (
                  <IoMoon className='text-white text-xl' />
              )}
            </div>
            <span className='font-nunitosans font-black text-lg text-gray-950 dark:text-white'>Dark Mode</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;