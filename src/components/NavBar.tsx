import { useAccount } from '../context/AccountContext';
import { useErrorContext } from '../context/ErrorContext';
import WalletConnectButton from './WalletConnectButton';
import 'tailwindcss/tailwind.css';

interface NavBarProps {
    onSelectMenuItem: (menuItem: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSelectMenuItem }) => {
    const { account } = useAccount();
    const { errorMsg } = useErrorContext();

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex">
                    <h1 className="text-white text-2xl font-bold">NFT Marketplace</h1>
                </div>
                <div className="flex space-x-4">
                    {account && !errorMsg ? (
                        <>
                            <span
                                className="cursor-pointer text-white hover:text-gray-300"
                                onClick={() => onSelectMenuItem('AllNFTs')}
                            >
                                전체보기
                            </span>
                            <span
                                className="cursor-pointer text-white hover:text-gray-300"
                                onClick={() => onSelectMenuItem('MintNFT')}
                            >
                                NFT 만들기
                            </span>
                            <span
                                className="cursor-pointer text-white hover:text-gray-300"
                                onClick={() => onSelectMenuItem('MyPage')}
                            >
                                마이페이지
                            </span>
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="text-white flex items-center">
                    <WalletConnectButton />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
