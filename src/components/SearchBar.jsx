import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(inputValue.trim()); // trigger search on Enter
    }
  };

  const handleSearchClick = () => {
    setSearchQuery(inputValue.trim()); // also trigger search if you want a search icon click
  };

  return (
    <div className='relative w-150 h-auto'>
      <input
        type="text"
        placeholder="Search for a country..."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="w-full px-6 py-6 pl-15 pr-10 font-nunitosans text-lg bg-white rounded-lg drop-shadow-xl"
      />
      <div 
        className="absolute inset-y-0 left-0 flex items-center pl-6 cursor-pointer"
        onClick={handleSearchClick}
      >
        <IoIosSearch className="w-6 h-6 text-gray-400"/>
      </div>
    </div>
  );
};

export default SearchBar;
