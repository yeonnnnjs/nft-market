import { getChainInfoByCurrency } from '@/public/data/ChainList';
import { getToNFTStorage } from '@/src/lib/ipfs';
import { getContractAddress } from '@/src/lib/contractPicker';
import { ethers } from 'ethers';

export const getMetadataByTokenId = async (req, res) => {
    const pathname = req.param;
    const chainCurrency = pathname.slice(0, 2);
    const tokenId = parseFloat(pathname.slice(-1));
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
    const uri = await contract.tokenURI(tokenId);
  
    const metadata = await getToNFTStorage(tokenId, uri);
    res.status(200).json(metadata);
  }
  
  export default getMetadataByTokenId;