import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import Header from '../components/Header';

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-blue-950 transition-colors duration-300 flex flex-col">
      <Header />
      
      <div className="grow flex flex-col justify-center items-center px-6 text-center">
        {/* Decorative Icon */}
        <div className="mb-8 text-6xl md:text-8xl text-blue-900 dark:text-white opacity-20">
          <FaExclamationTriangle />
        </div>
        
        <h2 className="font-nunitosans font-extrabold text-3xl md:text-5xl text-gray-950 dark:text-white mb-4 transition-colors duration-300">
          Oops!
        </h2>
        
        <p className="font-nunitosans text-lg md:text-xl text-gray-400 dark:text-gray-300 mb-10 max-w-md transition-colors duration-300">
          {message || "We couldn't find the page or country you were looking for."}
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="px-10 py-3 bg-white dark:bg-blue-900 rounded-lg shadow-md font-nunitosans font-bold text-base text-gray-950 dark:text-white 
                     transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer"
        >
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;