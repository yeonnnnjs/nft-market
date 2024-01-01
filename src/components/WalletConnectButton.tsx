import { useAccount } from '@/src/components/context/AccountContext';
import 'tailwindcss/tailwind.css';

const WalletConnectButton = () => {
  const { account, connectWallet, disconnectWallet } = useAccount();

  return (
    <div>
      {account ? (

        <div>
          <span className="mr-2">{account}</span>
          <button className="bg-white text-blue-500 px-2 py-1 rounded" onClick={disconnectWallet}>로그아웃</button>
        </div>
      ) : (
        <button className="bg-white text-blue-500 px-2 py-1 rounded" onClick={connectWallet}>로그인(MetaMask)</button>
      )}
    </div>
  );
};

export default WalletConnectButton;
