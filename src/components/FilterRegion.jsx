import React, { useState } from 'react';
import { RxCaretUp } from "react-icons/rx";

const FilterRegion = ({ selectedRegionLabel, setSelectedRegion, setSelectedRegionLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (region) => {
    const regionToSet = region === 'All Region' ? '' : region;
    setSelectedRegion(regionToSet); // filter logic
    setSelectedRegionLabel(region);  // update dropdown label
    setIsOpen(false);
  };

  return (
    <div className="relative w-65">
      <div
        className="w-full flex justify-between items-center cursor-pointer bg-white rounded-lg drop-shadow-xl px-7 py-6"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="font-nunitosans font-medium text-lg text-gray-950">
          {selectedRegionLabel}
        </span>
        <RxCaretUp
          className={`w-6 h-6 text-gray-950 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg drop-shadow-xl py-6 px-7 z-10">
          <ul className="space-y-2">
            {["All Region", "Africa", "Asia", "Europe", "Oceania", "Americas"].map(region => (
              <li
                key={region}
                className="cursor-pointer hover:opacity-60"
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
