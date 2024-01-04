import TransferNFTForm from '../../src/components/TransferNFTForm';
import { useRouter } from 'next/router';
import { getToNFTStorage } from '@/src/utils/ipfs';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getContractAddress } from '@/src/utils/contractPicker';
import { useAccount } from '@/src/context/AccountContext';
import { useErrorContext } from '@/src/context/ErrorContext';

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
}

const DetailNFT = () => {
    const router = useRouter();
    const [nft, setNft] = useState<NFT>();
    const { chainInfo, provider, account } = useAccount();
    const { setErrorMsg } = useErrorContext();
    const tokenId = parseFloat(router.query.nftId);

    const isValidNftId = async () => {
        const contractAddress = getContractAddress(chainInfo?.currency);
        const contractAbi = [{
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
        }];
        console.log("address : ", contractAddress, "abi : ", contractAbi, "provider : ", provider);
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        const uri = await contract.tokenURI(tokenId);
        if(!uri) {
            setErrorMsg("[404] 잘못된 접근입니다!");
        } else {
            return uri;
        }
    }

    const getNFT = async () => {
        const uri = await isValidNftId();
        const metadata = await getToNFTStorage(tokenId, uri);
        setNft(metadata);
    }

    useEffect(() => {
        console.log(account);
        if(account) {
            getNFT();
        }
    }, [account]);

    return (
        <div className="w-full h-full">
            <div className="bg-white p-4 rounded-md shadow-md w-50 h-50">
                <img src={nft?.image} alt={nft?.name} className="mb-2 rounded-md" />
                <h2 className="text-lg font-semibold">{nft?.name}</h2>
                <p className="text-gray-500">{nft?.description}</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
                <TransferNFTForm nftId={nft?.id} />
            </div>
        </div>
    );
};

export default DetailNFT;
