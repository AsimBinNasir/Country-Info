import React from 'react'
import { IoIosSearch } from "react-icons/io";
const SearchBar = () => {
  return (
    <div className='relative w-110 h-auto'>
       <input
            type="text"
            placeholder="Search for a country..."
            className="w-full px-4 py-4 pl-15 pr-10 font-nunitosans font-medium text-base text-gray-400 placeholder:text-gray-400 bg-white rounded-lg drop-shadow-xl  focus:outline-none focus:ring-1 focus:ring-gray-950"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-6">
            <IoIosSearch className="w-6 h-6 text-gray-400"/>
          </div>

    </div>
  )
}

export default SearchBar