import React from 'react'

const ErrorPage = ({message}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl font-bold text-red-600">{message}</h2>
    </div>
  );
};


export default ErrorPage