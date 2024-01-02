import { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from '../context/AccountContext';
import { getContractAddress } from '../utils/contractPicker';
import uploadToNFTStorage from '../utils/ipfs';
import 'tailwindcss/tailwind.css';

const MintNFTForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const { provider, chainInfo } = useAccount();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleMint = async () => {
    let metadata;
    if (image && provider) {
      try {
          if (image) {
            metadata = await uploadToNFTStorage(image, name, description);
          }

        const contractAddress = getContractAddress(chainInfo?.currency);
        const contractAbi = [
          {
            "constant": false,
            "inputs": [
              {
                "name": "name",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "uri",
                "type": "string"
              }
            ],
            "name": "safeMint",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];

        const signer = await provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractAbi, signer);
        const url = metadata.image.href;
        const mintTransaction = await nftContract.safeMint(metadata.name, metadata.description, url, { gasLimit: 500000 });
        await mintTransaction.wait();

        console.log('NFT successfully minted!');
      } catch (error) {
        console.error('Error minting NFT:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Image:</label>
        <input type="file" onChange={handleImageChange} accept="image/*" className="mt-1 p-2 border border-gray-300 rounded-md" />
        {imagePreview && (
          <img src={imagePreview} alt="Image Preview" className="mt-2 max-w-full h-auto" />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input type="text" value={name} onChange={handleNameChange} className="mt-1 p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description:</label>
        <input type="text" value={description} onChange={handleDescriptionChange} className="mt-1 p-2 border border-gray-300 rounded-md" />
      </div>
      <button onClick={handleMint} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">Mint NFT</button>
    </div>
  );
};

export default MintNFTForm;