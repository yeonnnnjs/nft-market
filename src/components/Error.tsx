import React from 'react';
import { useErrorContext } from '../context/ErrorContext';

const Error = () => {
    const { errorMsg } = useErrorContext();
  return (
    <div className="flex items-center bg-theme-background text-theme-text justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h3 className="text-4xl font-bold text-red-600">Error</h3>
        <p className="mt-4 text-gray-600">{errorMsg}</p>
      </div>
    </div>
  );
};

export default Error;
