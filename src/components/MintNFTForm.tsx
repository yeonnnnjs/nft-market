import { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from './context/AccountContext';
import uploadToNFTStorage from '@/public/utils/ipfs';

const MintNFTForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('ipfs');
  const { provider } = useAccount();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleMint = async () => {
    if ((image || imageUrl) && provider) {
      try {
        if (activeTab === 'ipfs') {
          if (image) {
            const ipfsUrl = await uploadToNFTStorage(image);
            setImageUrl(ipfsUrl);
          }
        }

        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
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

        const formData = new FormData();
        formData.append('uri', imageUrl);

        const mintTransaction = await nftContract.safeMint(formData, { gasLimit: 300000 });
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
        <label>
          Image:
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </label>
      ) : (
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
        </label>
      )}
      <button onClick={handleMint}>Mint NFT</button>
    </div>
  );
};

export default MintNFTForm;
