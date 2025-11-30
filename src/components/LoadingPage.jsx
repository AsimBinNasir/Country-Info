import React from 'react';
import { FaGlobeAmericas } from "react-icons/fa";

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-50">
      
      {/* Animated Globe */}
      <div className="spin-slow text-blue-900 text-6xl mb-6">
        <FaGlobeAmericas />
      </div>

      {/* Loading Text */}
      <p className="font-nunitosans font-bold text-2xl text-gray-950">
        Loading Countries...
      </p>

      {/* Optional Subtext */}
      <p className="font-nunitosans text-gray-400 mt-2">
        Please wait a moment
      </p>
    </div>
  );
};

export default LoadingPage;
