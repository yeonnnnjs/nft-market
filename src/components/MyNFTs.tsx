import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from './context/AccountContext';

function convertToObjects(list) {
  const numRows = list.length;
  const numCols = list[0].length;

  const resultArray = [];

  for (let col = 0; col < numCols; col++) {
    const obj = {};

    for (let row = 1; row < numRows; row++) {
      if (row === 1) {
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
  }, [account]);

  return (
    <div>
      <ul>
        {nftList.map((nft) => (
          <div>
            <li>name: {nft.name}</li>
            <li>description: {nft.description}</li>
            <img src={nft.image} alt={nft.name} width={500}></img>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MyNFTs;
