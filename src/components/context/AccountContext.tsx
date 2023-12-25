import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface AccountContextProps {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  setAccount: (account: string | null) => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const connectWallet = async () => {
    try {
      const ethereum = window.ethereum;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const [selectedAccount] = await provider.send('eth_requestAccounts', []);

        console.log(provider);
        console.log(selectedAccount);
        
        setProvider(provider);
        setAccount(selectedAccount);
      } else {
        console.error('MetaMask not detected');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setAccount(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', ([newAccount]) => {
        if (newAccount) {
          setAccount(newAccount);
        } else {
          disconnectWallet();
        }
      });
    }
  }, []);

  return (
    <AccountContext.Provider value={{ account, provider, setAccount, connectWallet, disconnectWallet }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
