import React from 'react';
import { useErrorContext } from '@/src/context/ErrorContext';

const ErrorPage = () => {
  const { errorMsg } = useErrorContext();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8">
        <h3 className="text-4xl font-bold text-red-600 mb-4">Error</h3>
        <p className="text-gray-600">{errorMsg}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
