import { ethers } from 'ethers';
import { getContractAddress } from '../../../src/lib/contractPicker';
import { getToNFTStorage } from '../../../src/lib/ipfs';
import { chainList } from '@/public/data/ChainList';

export const getAllNFTs = async () => {
    const promises = chainList.map(async (chain) => {
      try {
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
  
        const totalSupply = await contract.totalSupply();
        const promiseNFTs = [];
        for (let i = 0; i < parseFloat(totalSupply); i++) {
          const tokenId = await contract.tokenByIndex(i);
          const uri = await contract.tokenURI(tokenId);
          promiseNFTs.push(getToNFTStorage(tokenId, uri));
        }
        const allNFTs = await Promise.all(promiseNFTs);
        return allNFTs;
      } catch (error) {
        console.error('Error:', error);
      }
    });
    const results = await Promise.all(promises);
    const flattenedNFTs = results.flat();
    flattenedNFTs.map((nft) => {
      nft.id = parseFloat(nft.id)
    })
    return flattenedNFTs;
  };