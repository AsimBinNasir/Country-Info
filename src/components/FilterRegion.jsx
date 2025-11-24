import React from 'react'
import { RxCaretUp } from "react-icons/rx";
const FilterRegion = () => {
  return (
    <div className="relative w-65">
  {/* Dropdown Header */}
  <div className="w-full flex justify-between items-center cursor-pointer bg-white rounded-lg drop-shadow-xl px-7 py-6">
    <span className="font-nunitosans font-medium text-lg text-gray-950">
      Filter by Region
    </span>
    <RxCaretUp className="w-6 h-6 text-gray-950" />
  </div>

  {/* Dropdown Menu */}
  <div className="absolute top-full mt-2 w-full bg-white rounded-lg drop-shadow-xl py-6 px-7 z-10">
    <ul className="space-y-2 text-lg text-gray-950 font-nunitosans">
      <li className="cursor-pointer hover:opacity-60">Africa</li>
      <li className="cursor-pointer hover:opacity-60">Asia</li>
      <li className="cursor-pointer hover:opacity-60">Europe</li>
      <li className="cursor-pointer hover:opacity-60">Oceania</li>
      <li className="cursor-pointer hover:opacity-60">Americas</li>
    </ul>
  </div>
</div>

  )
}

export default FilterRegion