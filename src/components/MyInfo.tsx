import { useEffect, useState } from 'react';
import { useAccount } from '../context/AccountContext';
import { ethers } from 'ethers';

const MyInfo = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const { account, provider, connectWallet, disconnectWallet } = useAccount();

  useEffect(() => {
    fetchBalance();
  }, [account]);

  const fetchBalance = async () => {
    if (account && provider) {
      const balance = await provider.getBalance(account);
      setBalance(parseFloat(ethers.formatUnits(balance)));
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      {account ? (
        <div className="mt-4">
          <p className="text-xl font-bold">Connected: {account}</p>
          <p className="text-lg">
          Balance: {balance} ETH
        </p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={disconnectWallet}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={connectWallet}
        >
          로그인(MetaMask)
        </button>
      )}
    </div>
  );
};

export default MyInfo;