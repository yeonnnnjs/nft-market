import MintNFTForm from '../src/components/MintNFTForm';
import MyNFTs from '../src/components/MyNFTs';

interface MainContentProps {
    selectedMenuItem: string;
}

const Main: React.FC<MainContentProps> = ({ selectedMenuItem }) => {
    return (
        <main>
            {selectedMenuItem === 'MyNFTs' && <MyNFTs />}
            {selectedMenuItem === 'MintNFT' && <MintNFTForm />}
        </main>
    );
};

export default Main;
