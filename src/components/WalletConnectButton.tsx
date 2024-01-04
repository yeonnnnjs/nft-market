import { useAccount } from '../context/AccountContext';
import 'tailwindcss/tailwind.css';

const WalletConnectButton = () => {
  const { account, connectWallet, disconnectWallet } = useAccount();

  return (
    <div>
      {account ? (
        <div>
          <span className="mr-2 text-white">{account.substring(0, 6) + "....." + account.substring(account.length - 6)}</span>
          <button className="bg-white text-blue-500 px-2 py-1 rounded cursor-pointer  hover:text-gray-300" onClick={disconnectWallet}>로그아웃</button>
        </div>
      ) : (
        <button className="bg-white text-blue-500 px-2 py-1 rounded cursor-pointer  hover:text-gray-300" onClick={connectWallet}>로그인(MetaMask)</button>
      )}
    </div>
  );
};

export default WalletConnectButton;
