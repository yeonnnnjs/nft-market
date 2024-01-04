import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { chainList } from '@/public/data/ChainList';
import { getContractAddress } from '../../src/utils/contractPicker';
import { getToNFTStorage } from '../../src/utils/ipfs';
import NFTList from '../../src/components/NFTList';
import 'tailwindcss/tailwind.css';

interface NFT {
  id: number;
  image: string;
  name: string;
  description: string;
}

const AllNFTs = () => {
  const [nftList, setNFTList] = useState<NFT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = chainList.map(async (chain) => {
        return getAllNFTs(chain);
      });
      const results = await Promise.all(promises);
      const flattenedNFTs = results.flat();
      setNFTList(flattenedNFTs);
    };

    fetchData();
  }, []);

  const getAllNFTs = async (chain) => {
    const contractAddress = getContractAddress(chain?.currency);
    const contractAbi = [
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
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
    const provider = new ethers.JsonRpcProvider(chain?.rpcUrl);
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);

    try {
      const totalSupply = await contract.totalSupply();

      const promiseNFTs = []; 
      for (let i = 0; i < parseFloat(totalSupply.toString()); i++) {
        const tokenId = await contract.tokenByIndex(i);
        const uri = await contract.tokenURI(tokenId);
        promiseNFTs.push(getToNFTStorage(tokenId, uri));
      }
      
      const allNFTs = await Promise.all(promiseNFTs);
      return allNFTs;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='pt-[8vh]'>
      <NFTList list={nftList} />
    </div>
  );
};

export default AllNFTs;
