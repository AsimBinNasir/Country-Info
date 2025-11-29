import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='h-auto w-full px-25 py-7 bg-white flex items-center justify-between drop-shadow-md' >
      <div className='w-auto h-auto'>
        <h1 
        onClick={() => navigate('/')}
        className=' font-nunitosans font-extrabold text-3xl text-gray-950 cursor-pointer'>Where in the world?</h1>
      </div>

      <div className='flex items-center gap-7'>
        <div>
          <FaRegUserCircle size={34} className='text-gray-950 font-seemibold' />
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <div>
            <CgDarkMode size={32} className='text-gray-950' />
          </div>
          <div className='font-nunitosans font-bold text-2xl text-gray-950'>
            Dark Mode
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header