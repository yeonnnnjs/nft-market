import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ErrorContextProps {
  errorMsg: string;
  setErrorMsg: (message: string | null) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (errorMsg) {
      window.location.href = '/404';
    }
  }, [errorMsg]);


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
