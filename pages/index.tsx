import { useAccount } from '@/src/components/context/AccountContext';
import WalletConnectButton from '../src/components/WalletConnectButton';
import WalletBalance from '../src/components/WalletBalance';
import MintNFTForm from '../src/components/MintNFTForm';
import MyNFTs from '../src/components/MyNFTs';
import TransferNFTForm from '../src/components/TransferNFTForm';

const Main: React.FC = () => {
    const { account } = useAccount();

    return (
        <div>
            <main>
                <h1>NFT Marketplace</h1>
                <WalletConnectButton />
                {account && (
                    <div>
                        <WalletBalance />
                        <MintNFTForm />
                        <MyNFTs />
                        <TransferNFTForm />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Main;
