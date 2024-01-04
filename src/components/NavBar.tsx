import Link from 'next/link';
import { useAccount } from '../context/AccountContext';
import { useErrorContext } from '../context/ErrorContext';
import WalletConnectButton from './WalletConnectButton';
import 'tailwindcss/tailwind.css';

const NavBar = () => {
    const { account } = useAccount();
    const { errorMsg } = useErrorContext();

    return (
        <nav className="bg-blue-500 p-4 fixed w-full h-[8vh]">
            <div className="container mx-auto flex justify-between">
                <Link href={"/"}>
                    <h1 className="text-white text-2xl font-bold">NFT Marketplace</h1>
                </Link>
                <div className="space-x-4 flex items-center">
                    {account && !errorMsg ? (
                        <>
                            <span className="cursor-pointer text-white hover:text-gray-300">
                                <Link href={"/nft/all"}>
                                    전체보기
                                </Link>
                            </span>
                            <span className="cursor-pointer text-white hover:text-gray-300">
                                <Link href={"/nft/mint"}>
                                    NFT 만들기
                                </Link>
                            </span>
                            <span className="cursor-pointer text-white hover:text-gray-300">
                                <Link href={"/user/mypage"}>
                                    마이페이지
                                </Link>
                            </span>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <WalletConnectButton />
            </div>
        </nav>
    );
};

export default NavBar;
