import { useAccount } from '@/src/components/context/AccountContext';

const WalletConnectButton = () => {
  const { account, connectWallet, disconnectWallet } = useAccount();

  return (
    <div>
      {account ? (
        <div>
          <p>Connected: {account}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnectButton;
