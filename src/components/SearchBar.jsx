import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState('');

  // Implement debounce: wait 1000ms after last keystroke before updating search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue.trim());
    }, 500);

    // Cleanup function: cancels the timer if the user types again before 1s is up
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearchQuery]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='relative w-full md:max-w-[55%] h-auto'>
      <input
        type="text"
        placeholder="Search for a country..."
        value={inputValue}
        onChange={handleChange}
        className="w-full px-6 py-6 pl-15 pr-10 font-nunitosans text-lg text-gray-950 dark:text-white bg-white dark:bg-blue-900 rounded-lg drop-shadow-xl placeholder-gray-400 dark:placeholder-white focus:outline-none transition-colors duration-300"
      />
      <div 
        className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none"
      >
        <IoIosSearch className="w-6 h-6 text-gray-400 dark:text-white transition-colors duration-300"/>
      </div>
    </div>
  );
};

export default SearchBar;