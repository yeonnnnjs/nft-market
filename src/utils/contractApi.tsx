import { getChainInfoByCurrency } from '@/public/data/ChainList';
import { getContractAddress } from './contractPicker';
import { getToNFTStorage } from './ipfs';
import { chainList } from '@/public/data/ChainList';
import { ethers } from 'ethers';

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
        if(uri) {
          promiseNFTs.push(getToNFTStorage(tokenId, uri));
        }
      }
      const allPromises = await Promise.all(promiseNFTs);
      const allNFTs = allPromises.map((nft) => ({
          ...nft,
          nftId: chain.currency+nft?.id
      }))
      return allNFTs;
    } catch (error) {
      console.error('Error:', error);
    }
  });
  const results = await Promise.all(promises);
  const flattenedNFTs = results.flat();
  return flattenedNFTs;
};

export const getMetadataByNftId = async (nftId: string) => {
    const chainCurrency = nftId.slice(0, 3);
    const id = nftId.slice(3,);
    
    const chainInfo = getChainInfoByCurrency(chainCurrency);
  
    const provider = new ethers.JsonRpcProvider(chainInfo?.rpcUrl);
    const contractAddress = getContractAddress(chainInfo?.currency);
    const contractAbi = [{
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
    }];
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const uri = await contract.tokenURI(id);
  
    const metadata = await getToNFTStorage(id, uri);
    return metadata;
};

export const getAllNftIdToPaths = async () => {
  const nftList = await getAllNFTs();
  const nftIds = nftList.map((nft) => "/nft/" + nft.nftId);
  return nftIds;
};