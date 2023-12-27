import { useAccount } from '@/src/components/context/AccountContext';
import WalletConnectButton from '../src/components/WalletConnectButton';
import WalletBalance from '../src/components/WalletBalance';
import MintNFTForm from '../src/components/MintNFTForm';
import MyNFTs from '../src/components/MyNFTs';
import TransferNFTForm from '../src/components/TransferNFTForm';

const Main: React.FC = () => {

    const { account, setAccount } = useAccount();

    const handleConnectWallet = (selectedAccount: string) => {
        console.log("connect");
        setAccount(selectedAccount);
    };

    const handleTransferNFT = (to: string, nftId: number) => {
        console.log(`Transferring NFT to: ${to}, NFT ID: ${nftId}`);
    };

    return (
            <div>
                <main>
                    <h1>NFT Marketplace</h1>
                    <WalletConnectButton onConnect={handleConnectWallet} />
                    {account && (
                        <div>
                            <WalletBalance/>
                            <MintNFTForm/>
                            <MyNFTs/>
                            <TransferNFTForm onTransfer={handleTransferNFT} />
                        </div>
                    )}
                </main>
            </div>
    );
};

export default Main;
