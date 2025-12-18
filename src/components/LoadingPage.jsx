import React from 'react';
import { FaGlobeAmericas } from "react-icons/fa";

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 dark:bg-blue-950 transition-colors duration-300">
      
      {/* Animated Globe */}
      <div className="spin-slow text-blue-900 dark:text-white text-6xl mb-6 transition-colors duration-300">
        <FaGlobeAmericas />
      </div>

      {/* Loading Text */}
      <p className="font-nunitosans font-bold text-2xl text-gray-950 dark:text-white transition-colors duration-300">
        Loading Countries...
      </p>

      {/* Optional Subtext */}
      <p className="font-nunitosans text-gray-400 dark:text-gray-300 mt-2 transition-colors duration-300">
        Please wait a moment
      </p>
    </div>
  );
};

export default LoadingPage;