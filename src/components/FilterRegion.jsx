import React, { useState } from 'react';
import { RxCaretUp } from "react-icons/rx";

const FilterRegion = ({ selectedRegionLabel, setSelectedRegion, setSelectedRegionLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (region) => {
    // If 'All Region' is picked, we send an empty string to the filter logic
    const regionToSet = region === 'All Region' ? '' : region;
    setSelectedRegion(regionToSet); 
    setSelectedRegionLabel(region);  
    setIsOpen(false);
  };

  return (
    <div className="relative w-65 z-10">
      {/* Dropdown Header */}
      <div
        className="w-full flex justify-between items-center cursor-pointer bg-white dark:bg-blue-900 rounded-lg drop-shadow-xl px-7 py-6 transition-colors duration-300"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="font-nunitosans font-medium text-lg text-gray-950 dark:text-white transition-colors duration-300">
          {selectedRegionLabel}
        </span>
        <RxCaretUp
          className={`w-6 h-6 text-gray-950 dark:text-white transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-blue-900 rounded-lg drop-shadow-xl py-6 px-7 z-20 transition-colors duration-300">
          <ul className="space-y-2">
            {["All Region", "Africa", "Asia", "Europe", "Oceania", "Americas"].map(region => (
              <li
                key={region}
                className="cursor-pointer font-nunitosans font-medium text-lg hover:opacity-60 text-gray-950 dark:text-white transition-colors duration-300"
                onClick={() => handleSelect(region)}
              >
                {region}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterRegion;