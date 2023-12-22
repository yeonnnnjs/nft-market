// pages/index.tsx
import Head from 'next/head';
import { useState } from 'react';
import WalletConnectButton from '../components/WalletConnectButton';
import WalletBalance from '../components/WalletBalance';
import MintNFTForm from '../components/MintNFTForm';
import MyNFTs from '../components/MyNFTs';
import TransferNFTForm from '../components/TransferNFTForm';

const Home: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const handleConnectWallet = (selectedAccount: string) => {
    setAccount(selectedAccount);
  };

  const handleMintNFT = (image: string, title: string) => {
    console.log(`Minting NFT with image: ${image}, title: ${title}`);
  };

  const handleTransferNFT = (to: string, nftId: number) => {
    console.log(`Transferring NFT to: ${to}, NFT ID: ${nftId}`);
  };

  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT Marketplace for testing purposes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>NFT Marketplace</h1>
        <WalletConnectButton onConnect={handleConnectWallet} />

        {account && (
          <div>
            <WalletBalance account={account} />
            <MintNFTForm onMint={handleMintNFT} />
            <MyNFTs account={account} />
            <TransferNFTForm onTransfer={handleTransferNFT} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
