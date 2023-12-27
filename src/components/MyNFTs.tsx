import { useState, useEffect } from 'react';
import { useAccount } from './context/AccountContext';
import { ethers } from 'ethers'; 

const MyNFTs = () => {
  const [myNFTs, setMyNFTs] = useState<string[]>([]);
  const { account, provider } = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      if (account && provider) {
        const nftContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
        const nftContractABI = [
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
                "name": "",
                "type": "uint256[]"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          }
        ];

        try {
          const contract = new ethers.Contract(nftContractAddress, nftContractABI, provider);
          const result = await contract.getOwnedNFTs(account);
          setMyNFTs(result);
        } catch (error) {
          console.error("데이터를 가져오는 중 에러 발생:", error);
        }
      }
    };

    fetchData();
  }, [account]);

  return (
    <div>
      {account && myNFTs.length > 0 && (
        <div>
          <p>My NFTs:</p>
          <ul>
            {myNFTs.map((nftId) => (
              <li key={nftId}>NFT ID: {nftId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
