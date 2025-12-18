import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { IoMoonOutline, IoMoon } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi"; 
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Header = ({ onHomeClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      navigate('/');
    }
  };

  return (
    <div className='relative z-30'>
      {/* Header Bar */}
      <div className='h-auto w-full px-6 py-5 sm:px-10 sm:py-7 md:px-12 lg:px-15 xl:px-25 lg:py-7 bg-white dark:bg-blue-900 transition-colors duration-300 flex items-center justify-between drop-shadow-md'>
        <h1 
          onClick={handleHomeClick}
          className='font-nunitosans font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-950 dark:text-white cursor-pointer select-none transition-colors duration-300'>
          Where in the world?
        </h1>

        {/* Hamburger for mobile */}
        <div className='flex items-center gap-4 md:hidden'>
          <GiHamburgerMenu
            className='text-gray-950 dark:text-white text-2xl cursor-pointer transition-colors duration-300'
            onClick={toggleMenu}
          />
        </div>

        {/* Normal items for desktop */}
        <div className='hidden md:flex items-center gap-7'>
          <FaRegUserCircle className='text-gray-950 dark:text-white cursor-pointer text-3xl transition-colors duration-300' />
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

      {/* Background Overlay */}
      {isOpen && (
        <div 
          className='fixed inset-0 bg-black/50 z-40'
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sliding Sidebar for Mobile */}
      <div className={`fixed top-0 right-0 h-screen w-3/4 bg-white dark:bg-blue-900 z-50 transform transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className='flex flex-col p-6 gap-6'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold text-gray-950 dark:text-white'>Menu</h2>
            <button onClick={toggleMenu} className='text-gray-950 dark:text-white font-bold text-xl'>X</button>
          </div>

          <div className='flex items-center gap-4 cursor-pointer'>
            <FaRegUserCircle className='text-gray-950 dark:text-white text-3xl' />
            <span className='font-nunitosans font-bold text-lg text-gray-950 dark:text-white'>Profile</span>
          </div>

          <div className='flex items-center gap-4 cursor-pointer' onClick={() => { toggleTheme(); toggleMenu(); }}>
            {theme === 'light' ? (
                <IoMoonOutline className='text-gray-950 dark:text-white text-3xl' />
            ) : (
                <IoMoon className='text-white text-3xl' />
            )}
            <span className='font-nunitosans font-bold text-lg text-gray-950 dark:text-white'>Dark Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;