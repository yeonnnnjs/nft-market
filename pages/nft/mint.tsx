import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from '@/src/context/AccountContext';
import { getContractAddress } from '@/src/utils/contractPicker';
import 'tailwindcss/tailwind.css';

const MintNFTForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const { provider, chainInfo } = useAccount();
  const [msg, setMsg] = useState<string>();
  const { account } = useAccount();

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
    const formData = new FormData();
    formData.append('image', image as File);
    formData.append('name', name);
    formData.append('description', description);

    if (image && provider) {
      try {
        if (!chainInfo?.currency) {
          setMsg("지원하지 않는 네트워크입니다!");
        }        
        else {
          setMsg('민팅 진행 중...');
          const response = await fetch("/api/ipfs/upload", {
            method: 'POST',
            body: formData
          });
          const metadata = await response.json();
          const contractAddress = getContractAddress(chainInfo?.currency);
          const contractAbi = [
            {
              "constant": false,
              "inputs": [
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
          const mintTransaction = await nftContract.safeMint(metadata.url, { gasLimit: 500000 });
          await mintTransaction.wait().then(
            setMsg('민팅 완료!')
          );
        }
      } catch (error) {
        console.error('Error minting NFT:', error);
      }
    }
  };

  return (
  <div className='pt-[8vh]'>
    {account ? (<div className='pt-[8vh] flex items-center justify-center flex-col gap-4'>
      <div className="flex w-full h-full">
        <div className="bg-white p-8 rounded-md shadow-md w-1/2">
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <input type="file" onChange={handleImageChange} accept="image/*"
                 className="mt-1 p-2 border border-gray-300 rounded-md h-50"/>
          {imagePreview && (
              <img src={imagePreview} alt="Image Preview" className="mt-2 max-w-full h-auto"/>
          )}
        </div>

        <div className="bg-white p-8 rounded-md shadow-md w-1/2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input type="text" value={name} onChange={handleNameChange}
                   className="mt-1 p-2 border border-gray-300 rounded-md"/>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <input type="text" value={description} onChange={handleDescriptionChange}
                   className="mt-1 p-2 border border-gray-300 rounded-md"/>
          </div>
        </div>
      </div>
      {msg}
      <button onClick={handleMint}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 w-[40vw] flex justify-center mx-auto">Mint
        NFT
      </button>
    </div>) : (<></>)
    }
  </div>
)
  ;
};

export default MintNFTForm;