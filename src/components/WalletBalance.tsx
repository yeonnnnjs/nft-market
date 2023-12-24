import { useEffect, useState } from 'react';
import { useAccount } from './context/AccountContext';
import { ethers } from 'ethers';

const WalletBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const { account } = useAccount();

  useEffect(() => {
    console.log(account);
    console.log(window);

    fetchBalance();
  }, [account]);

  const fetchBalance = async () => {
    if (account) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(account);
      setBalance(parseFloat(ethers.formatUnits(balance)));
    }
  };

  return (
    <div>
      {account && balance !== null && (
        <p>
          Balance: {balance} ETH
        </p>
      )}
    </div>
  );
};

export default WalletBalance;
