import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface WalletBalanceProps {
  account: string | null;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ account }) => {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(parseFloat(ethers.utils.formatEther(balance)));
      }
    };

    fetchBalance();
  }, [account]);

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
