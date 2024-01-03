import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from '../context/AccountContext';
import { getContractAddress } from '../utils/contractPicker';
import 'tailwindcss/tailwind.css';
import { getToNFTStorage } from '../utils/ipfs';

const AllNFTs = () => {
  const [nftList, setNFTList] = useState([]);
  const { account, provider, chainInfo } = useAccount();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNFTSelect = (index : number) => {
    setSelectedNFT(nftList[index]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
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

    const getAllNFTs = async () => {
      try {
        const balance = await contract.balanceOf(account);
        const ownedNFTs = [];
        for (let i = 0; i < parseFloat(balance); i++) {
          const tokenId = await contract.tokenByIndex(i);
          const uri = await contract.tokenURI(tokenId);
          const nft = await getToNFTStorage(tokenId, uri);
          ownedNFTs.push(nft);
        }
        setNFTList(ownedNFTs);
        console.log("Owned NFTs:", ownedNFTs);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (account) {
      getAllNFTs();
    }
  }, [account, provider]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {!nftList.length ?
        (
          <div className="col-span-full flex items-center justify-center mt-8">
            <div className="bg-gray-100 p-8 rounded-md shadow-md">
              <h1 className="text-xl font-semibold text-gray-600">NFT가 없습니다!</h1>
            </div>
          </div>
        ) : (
          nftList.map((nft, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md flex flex-col items-center justify-between">
              <img src={nft.image} alt={nft.name} className="mb-2 rounded-md" />
              <div className="flex flex-col h-full items-center">
                  <h2 className="text-lg font-semibold">{nft.name}</h2>
                  <p className="text-gray-500">{nft.description}</p>
                  <button onClick={() => handleNFTSelect(index)} className="text-blue-500">상세보기</button>
              </div>
            </div>
          ))
        )
      }

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <img src={selectedNFT?.image} alt={selectedNFT?.name} className="mb-2 rounded-md" />
            <h2 className="text-lg font-semibold">{selectedNFT?.name}</h2>
            <p className="text-gray-500">{selectedNFT?.description}</p>
            <button onClick={handleCloseModal} className="text-blue-500">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNFTs;