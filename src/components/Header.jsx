import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi"; // hamburger icon
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <div className='relative'>
      {/* Header */}
      <div className='h-auto w-full px-6 py-5 sm:px-10 sm:py-7 md:px-12 lg:px-15 xl:px-25 lg:py-7 bg-white flex items-center justify-between drop-shadow-md'>
        <h1 
          onClick={() => navigate('/')}
          className='font-nunitosans font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-950 cursor-pointer'>
          Where in the world?
        </h1>

        {/* Hamburger for mobile */}
        <div className='flex items-center gap-4 md:hidden'>
          <GiHamburgerMenu
            className='text-gray-950 text-2xl cursor-pointer'
            onClick={toggleMenu}
          />
        </div>

        {/* Normal items for desktop */}
        <div className='hidden md:flex items-center gap-7'>
          <FaRegUserCircle className='text-gray-950 cursor-pointer text-3xl' />
          <div className='flex items-center gap-2 cursor-pointer'>
            <CgDarkMode className='text-gray-950 text-2xl' />
            <div className='font-nunitosans font-bold text-xl text-gray-950'>
              Dark Mode
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className='fixed inset-0 bg-black/50 z-40'
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sliding Sidebar */}
      <div className={`fixed top-0 right-0 h-screen w-3/4 bg-white z-50 transform transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className='flex flex-col p-6 gap-6'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold'>Menu</h2>
            <button onClick={toggleMenu} className='text-gray-950 font-bold text-xl'>X</button>
          </div>

          <div className='flex items-center gap-4 cursor-pointer'>
            <FaRegUserCircle className='text-gray-950 text-3xl' />
            <span className='font-nunitosans font-bold text-lg text-gray-950'>Profile</span>
          </div>

          <div className='flex items-center gap-4 cursor-pointer'>
            <CgDarkMode className='text-gray-950 text-3xl' />
            <span className='font-nunitosans font-bold text-lg text-gray-950'>Dark Mode</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
