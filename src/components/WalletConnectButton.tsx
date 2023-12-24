import { useEffect, useState } from 'react';
import { useAccount } from '@/src/components/context/AccountContext';

const WalletConnectButton = () => {
  const { account, setAccount } = useAccount();
  
  const connectWallet = async () => {
    try {
      const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(selectedAccount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <div>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnectButton;
