import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Chain, getChainInfo } from '@/public/data/ChainList';

interface AccountContextProps {
  account: string | null;
  balance: string | null;
  provider: ethers.BrowserProvider | null;
  chainInfo: Chain | null;
  setAccount: (account: string | null) => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [chainInfo, setChainInfo] = useState<Chain | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const handleChainChange = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider?.getNetwork();
      const newChain = getChainInfo(parseFloat(network?.chainId));
      setChainInfo(newChain);
    } catch (error) {
      console.error('Error handling chain change:', error.message);
    }
  };

  const connectWallet = async () => {
    try {
      const ethereum = window.ethereum;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const selectedAccount = sessionStorage.getItem('userAccount') || await provider.send('eth_requestAccounts', []).then(accounts => {
          return accounts[0];
        });
        const balance = await provider.getBalance(selectedAccount);
        const network = await provider.getNetwork();
        const chain = getChainInfo(parseFloat(network.chainId));

        setBalance(ethers.formatEther(balance));
        console.log(balance);
        setChainInfo(chain);
        setProvider(provider);
        setAccount(selectedAccount);

        sessionStorage.setItem('userAccount', [selectedAccount]);
      } else {
        console.log("MetaMask not installed; using read-only defaults");
        const provider = ethers.getDefaultProvider();
        setProvider(provider);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
    }
  };

  const disconnectWallet = async () => {
    setProvider(null);
    setAccount(null);
    setChainInfo(null);
    sessionStorage.removeItem('userAccount');
    window.location.href = '/user/login';
  };

  useEffect(() => {
    const session = sessionStorage.getItem('userAccount');
    const ethereum = window.ethereum;
    if (session) {
      connectWallet();
    }

    if (ethereum) {
      ethereum.on('accountsChanged', ([newAccount]) => {
        if (newAccount) {
          setAccount(newAccount);
          sessionStorage.setItem('userAccount', newAccount);
        } else {
          disconnectWallet();
        }
      });

      ethereum.on('chainChanged', handleChainChange);
    }
  }, []);

  return (
    <AccountContext.Provider value={{ account, provider, balance, chainInfo, setAccount, connectWallet, disconnectWallet }}>
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