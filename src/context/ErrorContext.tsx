import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ErrorContextProps {
  errorMsg: string;
  setErrorMsg: (message: string | null) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState('');
  return (
    <ErrorContext.Provider value={{ errorMsg, setErrorMsg }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = (): ErrorContextProps => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }

  return context;
};