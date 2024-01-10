import { useAccount } from '@/src/context/AccountContext';
import NFTList from '../../src/components/NFTList';
import checkAuth, {CheckAuth} from '@/src/utils/auth';
import 'tailwindcss/tailwind.css';
import { GetOwnedNFTs } from "@/src/utils/contractApi";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
    nftId: string;
}

interface myPageProps {
    nftList: NFT[];
}

const MyPage = ({nftList}: myPageProps) => {
    const router = useRouter();
    const { account, balance, chainInfo, connectWallet } = useAccount();

    useEffect(() => {
        CheckAuth();
    }, []);

    return (
        <div className='pt-[8vh]'>
            <div className="p-4 bg-theme-background text-theme-text bg-gray-100 rounded-md shadow-md">
                {account ? (
                    <div className="mt-4 bg-theme-background text-theme-text">
                        <p className="text-xl font-bold">{account}</p>
                        <p className="text-lg">
                            Balance: {balance} {chainInfo?.currency}
                        </p>
                    </div>
                ) : (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={connectWallet}
                    >
                        로그인(MetaMask)
                    </button>
                )}
            </div>
            <div className='w-full flex items-center justify-center mt-8'>
                <p className="text-xl font-bold">내 NFT</p>
            </div>
            <NFTList
                list={nftList}
            />
        </div>
    );
};

export const getServerSideProps = async (context: any) => {
    const account = context.req.headers.cookie.split("; ")
        .find((row: string) => row.startsWith("account="))
        ?.split("=")[1];
    let nftList: any[] = [];
    if (account) {
        nftList = await GetOwnedNFTs(account);
    }
    return {
        props: {
            nftList
        },
    }
}

export default MyPage;