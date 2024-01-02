import MintNFTForm from '../src/components/MintNFTForm';
import MyNFTs from '../src/components/MyNFTs';
import MyInfo from '@/src/components/MyInfo';

interface MainContentProps {
    selectedMenuItem: string;
}

const Main: React.FC<MainContentProps> = ({ selectedMenuItem }) => {
    return (
        <main>
            {selectedMenuItem === 'MyInfo' && <MyInfo />}
            {selectedMenuItem === 'MyNFTs' && <MyNFTs />}
            {selectedMenuItem === 'MintNFT' && <MintNFTForm />}
        </main>
    );
};

export default Main;
