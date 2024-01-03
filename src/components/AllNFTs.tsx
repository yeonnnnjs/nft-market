import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from '../context/AccountContext';
import { getContractAddress } from '../utils/contractPicker';
import { getToNFTStorage } from '../utils/ipfs';
import NFTList from './NFTList';
import 'tailwindcss/tailwind.css';

interface NFT {
  id: number;
  image: string;
  name: string;
  description: string;
}

const AllNFTs = () => {
  const [nftList, setNFTList] = useState<NFT[]>([]);
  const { account, provider, chainInfo } = useAccount();

  useEffect(() => {
    if (account) {
      getAllNFTs();
    }
  }, []);

  useEffect(() => {
    if (account) {
      getAllNFTs();
    }
  }, [account, provider]);

  const getAllNFTs = async () => {
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
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
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

      for (let i = 0; i < parseFloat(balance.toString()); i++) {
        const tokenId = await contract.tokenByIndex(i);
        const uri = await contract.tokenURI(tokenId);
        getToNFTStorage(tokenId, uri).then((nft) => {
          ownedNFTs.push(nft);
          setNFTList(ownedNFTs);
        });
      }

      console.log('Owned NFTs:', ownedNFTs);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <NFTList
        list={nftList}
        isMyNFTs={false}
      />
  );
};

export default AllNFTs;
