import { getChainInfoByCurrency } from '@/public/data/ChainList';
import { getContractAddress } from './contractPicker';
import { getToNFTStorage } from './ipfs';
import { chainList } from '@/public/data/ChainList';
import { ethers } from 'ethers';

interface NFT {
  id: number;
  image: string;
  name: string;
  description: string;
  nftId: string;
}

export const GetAllNFTs = async () => {
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
        console.log(chain.currency, tokenId, uri);
        if(uri) {
          promiseNFTs.push(getToNFTStorage(tokenId, uri));
        }
      }
      const allPromises = await Promise.all(promiseNFTs);
      const allNFTs = allPromises.map((nft) => {
        if(nft) {
          nft.id = Number(nft.id); 
        }
        return {
          ...nft,
          nftId: chain.currency+nft?.id
        }
      });
      return allNFTs;
    } catch (error) {
      console.error('Error:', error);
    }
  });
  const results = await Promise.all(promises);
  const flattenedNFTs = results.flat();
  return flattenedNFTs;
};

export const GetMetadataByNftId = async (nftId: string) => {
    const chainCurrency = nftId.slice(0, 3);
    const id = Number(nftId.slice(3,));
    
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
    try {
      const uri = await contract.tokenURI(id);
      const metadata = await getToNFTStorage(id, uri);
      return metadata;
    } catch (e: any) {
      return null;
    }
};

export const GetAllNftIdToPaths = async () => {
  const nftList = await GetAllNFTs();
  const nftIds = nftList.map((nft) => "/nft/" + nft?.nftId);
  return nftIds;
};

export const GetOwnedNFTs = async (account: string | null) => {
  const promises = chainList.map(async (chain) => {
    try {
      const contractAddress = getContractAddress(chain?.currency);
      const contractAbi = [
          {
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
      const provider = new ethers.JsonRpcProvider(chain?.rpcUrl);
      const contract = new ethers.Contract(contractAddress, contractAbi, provider);
      const balance = await contract.balanceOf(account);
      const ownedNFTs = [];
      for (let i = 0; i < parseFloat(balance); i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        const uri = await contract.tokenURI(tokenId);
        console.log(chain.currency, tokenId, uri);
        if(uri) {
          ownedNFTs.push(getToNFTStorage(tokenId, uri));
        }
      }
      const allPromises = await Promise.all(ownedNFTs);
      const allNFTs = allPromises.map((nft) => {
        if(nft) {
          nft.id = Number(nft.id);
        }
        return {
          ...nft,
          nftId: chain.currency+nft?.id
        }
      });
      return allNFTs;
    } catch (error) {
      console.error(error);
      return [];
    }
  });
  const results = await Promise.all(promises);
  const flattenedNFTs = results.flat();
  return flattenedNFTs;
}