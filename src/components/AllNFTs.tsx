import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from '../context/AccountContext';
import { getContractAddress } from '../utils/contractPicker';
import TransferNFTForm from './TransferNFTForm';
import 'tailwindcss/tailwind.css';

function convertToObjects(list) {
  const numRows = list.length;
  const numCols = list[0].length;

  const resultArray = [];

  for (let row = 0; row < numRows; row++) {
    const obj = {};
    for (let col = 0; col < numCols; col++) {
      if (col === 0) {
        obj['id'] = list[row][col];
      } else if (col === 1) {
        obj['image'] = list[row][col].replace('ipfs://', 'https://ipfs.io/ipfs/');
      } else if (col === 2) {
        obj['name'] = list[row][col];
      } else if (col === 3) {
        obj['description'] = list[row][col];
      }
    }
    resultArray.push(obj);
  }
  return resultArray;
}

const AllNFTs = () => {
  const [nftList, setNFTList] = useState([]);
  const { account, provider, chainInfo } = useAccount();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNFTSelect = (index) => {
    setSelectedNFT(nftList[index]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const contractAddress = getContractAddress(chainInfo?.currency);
    const contractAbi = [
        {
          "constant": true,
          "inputs": [],
          "name": "getAllNFTs",
          "outputs": [
            {
              "name": "",
              "type": "tuple[]",
              "components": [
                {"name": "tokenId", "type": "uint256"},
                {"name": "tokenURI", "type": "string"},
                {"name": "name", "type": "string"},
                {"name": "description", "type": "string"}
              ]
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ];

    const contract = new ethers.Contract(contractAddress, contractAbi, provider);

    const fetchNFTList = async () => {
      try {
        const result = await contract.getAllNFTs();
        const array = convertToObjects(result);
        setNFTList(array);
      } catch (error) {
        console.error('Error fetching NFT list:', error);
      }
    };

    if (account) {
      fetchNFTList();
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
            <div key={index} className="bg-white p-4 rounded-md shadow-md flex flex-col items-center">
              <img src={nft.image} alt={nft.name} className="mb-2 rounded-md" />
              <h2 className="text-lg font-semibold">{nft.name}</h2>
              <p className="text-gray-500">{nft.description}</p>
              <div className="flex gap-4">
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