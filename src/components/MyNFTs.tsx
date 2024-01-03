import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from '../context/AccountContext';
import { getContractAddress } from '../utils/contractPicker';
import { getToNFTStorage } from '../utils/ipfs';
import TransferNFTForm from './TransferNFTForm';
import 'tailwindcss/tailwind.css';

const MyNFTs = () => {
  const [nftList, setNFTList] = useState([]);
  const { account, provider, chainInfo } = useAccount();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(true);

  const handleNFTSelect = (index : number, type : boolean) => {
    setModalType(type);
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

    const getOwnedNFTs = async () => {
      try {
        const balance = await contract.balanceOf(account);
        console.log(balance);
        const ownedNFTs = [];
        for (let i = 0; i < parseFloat(balance); i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(account, i);
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
      getOwnedNFTs();
    }
  }, [account, provider]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {!nftList.length ?
        (
          <div className="col-span-full flex items-center justify-center mt-8">
            <div className="bg-gray-100 p-8 rounded-md shadow-md">
              <h1 className="text-xl font-semibold text-gray-600">보유한 NFT가 없습니다!</h1>
            </div>
          </div>
        ) : (
          nftList.map((nft, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md flex flex-col items-center">
              <img src={nft.image} alt={nft.name} className="mb-2 rounded-md" />
              <h2 className="text-lg font-semibold">{nft.name}</h2>
              <p className="text-gray-500">{nft.description}</p>
              <div className="flex gap-4">
                <button onClick={() => handleNFTSelect(index, true)} className="text-blue-500">상세보기</button>
                <button onClick={() => handleNFTSelect(index, false)} className="text-blue-500">전송하기</button>
              </div>
            </div>
          ))
        )
      }

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
              <TransferNFTForm nftId={selectedNFT.id} />
              <button onClick={handleCloseModal} className="text-blue-500">닫기</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyNFTs;