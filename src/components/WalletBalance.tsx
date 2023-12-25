import { useEffect, useState } from 'react';
import { useAccount } from './context/AccountContext';
import { ethers } from 'ethers';

const WalletBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const { account, provider } = useAccount();

  useEffect(() => {
    fetchBalance();
  }, [account]);

  const fetchBalance = async () => {
    console.log(provider);
    if (account && provider) {
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
