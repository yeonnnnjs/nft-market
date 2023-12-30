import { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from './context/AccountContext';
import uploadToNFTStorage from '@/public/utils/ipfs';

const MintNFTForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('ipfs');
  const { provider } = useAccount();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
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
        if (activeTab === 'ipfs') {
          if (image) {
            metadata = await uploadToNFTStorage(image, name, description);
          }
        }

        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
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
        const mintTransaction = await nftContract.safeMint(metadata.name, metadata.description, url , { gasLimit: 300000 });
        await mintTransaction.wait();

        console.log('NFT successfully minted!');
      } catch (error) {
        console.error('Error minting NFT:', error);
      }
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('ipfs')} style={{ borderBottom: activeTab === 'ipfs' ? '2px solid black' : 'none' }}>
          Use IPFS
        </button>
        <button onClick={() => setActiveTab('direct')} style={{ borderBottom: activeTab === 'direct' ? '2px solid black' : 'none' }}>
          Direct Image URL
        </button>
      </div>
      {activeTab === 'ipfs' ? (
        <div>
        <label>
          Image:
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </label>
        <br></br>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
        Description:
          <input type="text" value={description} onChange={handleDescriptionChange} />
        </label>
        </div>
      ) : (
        <label>
          Image URL:
          {/* <input type="text" value={imageUrl} onChange={handleImageUrlChange} /> */}
        </label>
      )}
      <button onClick={handleMint}>Mint NFT</button>
    </div>
  );
};

export default MintNFTForm;
