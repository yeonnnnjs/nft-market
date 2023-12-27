import { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from './context/AccountContext';
import uploadToNFTStorage from '@/public/utils/ipfs';

const MintNFTForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const { provider } = useAccount();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleMint = async () => {
    if (image && provider) {
      try {
        const imageUri = await uploadToNFTStorage(image);
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
        const contractAbi = [{
          "type": "function",
          "name": "safeMint",
          "inputs": [
            {
              "name": "uri",
              "type": "string"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable",
          "constant": false,
          "payable": false
        }];

        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractAbi, signer);

        const formData = new FormData();
        formData.append('uri', imageUri);

        const mintTransaction = await nftContract.mintNFT(formData, { gasLimit: 300000 });
        await mintTransaction.wait();

        console.log('NFT successfully minted!');
        onMint(image, title);
      } catch (error) {
        console.error('Error minting NFT:', error);
      }
    }
  };

  return (
    <div>
      <label>
        Image:
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </label>
      <button onClick={handleMint}>Mint NFT</button>
    </div>
  );
};

export default MintNFTForm;
