import { useRouter } from 'next/router';
import WalletConnectButton from './WalletConnectButton';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const NavBar = () => {
    const router = useRouter();

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    return (
        <nav className="bg-blue-500 p-4 fixed w-full h-[8vh]">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-white text-2xl font-bold cursor-pointer" onClick={() => handleNavigate("/")}>
                    NFT Marketplace
                </h1>
                <div className="space-x-4 flex items-center">
                    <span className="cursor-pointer text-white hover:text-gray-300" onClick={() => handleNavigate("/nft/all")}>
                        전체보기
                    </span>
                    <span className="cursor-pointer text-white hover:text-gray-300" onClick={() => handleNavigate("/nft/mint")}>
                        NFT 만들기
                    </span>
                    <span className="cursor-pointer text-white hover:text-gray-300" onClick={() => handleNavigate("/user/mypage")}>
                        마이페이지
                    </span>
                </div>
                <WalletConnectButton />
            </div>
        </nav>
    );
};

export default NavBar;
