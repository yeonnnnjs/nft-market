import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from '../context/AccountContext';
import TransferNFTForm from './TransferNFTForm';
import 'tailwindcss/tailwind.css';

function convertToObjects(list) {
  const numRows = list.length;
  const numCols = list[0].length;

  const resultArray = [];

  for (let col = 0; col < numCols; col++) {
    const obj = {};

    for (let row = 0; row < numRows; row++) {
      if (row === 0) {
        obj['id'] = list[row][col];
      } else if (row === 1) {
        obj['image'] = list[row][col].replace('ipfs://', 'https://ipfs.io/ipfs/');
      } else if (row === 2) {
        obj['name'] = list[row][col];
      } else if (row === 3) {
        obj['description'] = list[row][col];
      }
    }
    resultArray.push(obj);
  }
  return resultArray;
}

const MyNFTs = () => {
  const [nftList, setNFTList] = useState([]);
  const { account, provider } = useAccount();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(true);

  const handleNFTSelect = (index, type) => {
    setModalType(type);
    setSelectedNFT(nftList[index]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    const contractAbi = [
      {
        "constant": true,
        "inputs": [
          {
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "getOwnedNFTs",
        "outputs": [
          {
            "name": "ownedNFTs",
            "type": "uint256[]"
          },
          {
            "name": "tokenURIs",
            "type": "string[]"
          },
          {
            "name": "tokenNames",
            "type": "string[]"
          },
          {
            "name": "tokenDescriptions",
            "type": "string[]"
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
        const result = await contract.getOwnedNFTs(account);
        const array = convertToObjects(result);
        console.log(array);
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
      {nftList.map((nft, index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-md">
          <img src={nft.image} alt={nft.name} className="mb-2 rounded-md" />
          <h2 className="text-lg font-semibold">{nft.name}</h2>
          <p className="text-gray-500">{nft.description}</p>
          <div className="flex gap-4">
            <button onClick={() => handleNFTSelect(index, true)} className="text-blue-500">상세보기</button>
            <button onClick={() => handleNFTSelect(index, false)} className="text-blue-500">전송하기</button>
          </div>
        </div>
      ))}

      {isModalOpen && (
        (modalType ? (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md shadow-md">
              <img src={selectedNFT?.image} alt={selectedNFT?.name} className="mb-2 rounded-md" />
              <h2 className="text-lg font-semibold">{selectedNFT?.name}</h2>
              <p className="text-gray-500">{selectedNFT?.description}</p>
              <button onClick={handleCloseModal} className="text-blue-500">닫기</button>
            </div>
          </div>
        ) : (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md shadow-md">
              <TransferNFTForm nftId={selectedNFT.id}/>
              <button onClick={handleCloseModal} className="text-blue-500">닫기</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyNFTs;