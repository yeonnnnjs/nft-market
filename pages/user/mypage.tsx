import { useEffect, useState } from 'react';
import { useAccount } from '../../src/context/AccountContext';
import { ethers } from 'ethers';
import { getContractAddress } from '../../src/utils/contractPicker';
import { getToNFTStorage } from '@/src/utils/ipfs';
import NFTList from '../../src/components/NFTList';
import checkAuth from '@/src/utils/auth';
import 'tailwindcss/tailwind.css';

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
    nftId: string;
}

const MyPage = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const { account, provider, chainInfo, connectWallet } = useAccount();
    const [nftList, setNFTList] = useState<NFT[]>([]);

    useEffect(() => {
        checkAuth(account);
        if (account) {
            fetchBalance();
            getOwnedNFTs();
        } 
    }, []);

    useEffect(() => {
        checkAuth(account);
        if (account) {
            fetchBalance();
            getOwnedNFTs();
        }
    }, [account, provider]);

    const getOwnedNFTs = async () => {
        const contractAddress = getContractAddress(chainInfo?.currency);
        const contractAbi = [{
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "tokenOfOwnerByIndex",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
        ];

        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        try {
            const balance = await contract.balanceOf(account);
            const ownedNFTs: NFT[] = [];
            for (let i = 0; i < parseFloat(balance); i++) {
                const tokenId = await contract.tokenOfOwnerByIndex(account, i);
                const uri = await contract.tokenURI(tokenId);
                getToNFTStorage(tokenId, uri).then((nft) => {
                    ownedNFTs.push(nft as NFT);
                    setNFTList(ownedNFTs);
                });
            }
            console.log("Owned NFTs:", ownedNFTs);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const fetchBalance = async () => {
        if (account && provider) {
            const balance = await provider.getBalance(account);
            setBalance(parseFloat(ethers.formatUnits(balance)));
        }
    };

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

export default MyPage;