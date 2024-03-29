import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from '../context/AccountContext';
import { getContractAddress } from '../utils/contractPicker';

interface TransferNFTProps {
  nftId: number;
}

const TransferNFTForm: React.FC<TransferNFTProps> = ({ nftId }) => {
  const [to, setTo] = useState('');
  const { provider, chainInfo } = useAccount();

  useEffect(() => {
    nftId = Number(nftId);
  }, [nftId]);

  const handleTransfer = async () => {
    if (provider) {
      try {
        const contractAddress = getContractAddress(chainInfo?.currency);
        const contractAbi = [
          {
            "constant": false,
            "inputs": [
              {
                "name": "to",
                "type": "address"
              },
              {
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "transferNFT",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];

        const signer = await provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractAbi, signer);

        const mintTransaction = await nftContract.transferNFT(to, nftId, { gasLimit: 500000 });
        await mintTransaction.wait();

        console.log('NFT successfully transferred to', to);
      } catch (error) {
        console.error('Error transferring NFT:', error);
      }
    }
  };

  return (
    <>
      <label className="block mb-2">
        NFT를 보낼 지갑 주소
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </label>
      <button
        onClick={handleTransfer}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        전송
      </button>
    </>
  );
};

export default TransferNFTForm;