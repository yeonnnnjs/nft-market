import { useState } from 'react';
import { ethers } from 'ethers';

interface MintNFTFormProps {
  onMint: (image: File, title: string) => void;
}

const MintNFTForm: React.FC<MintNFTFormProps> = ({ onMint }) => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleMint = async () => {
    if (image) {
      try {
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
        const contractAbi = [{
          "type": "function",
          "name": "safeMint",
          "inputs": [
            {
              "name": "to",
              "type": "address"
            },
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
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractAbi, signer);

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);

        // 이미지와 제목을 formData로 전송
        const mintTransaction = await nftContract.mintNFT(formData, { gasLimit: 300000 });
        await mintTransaction.wait();

        // Mint 성공 후 추가 로직 수행
        console.log('NFT successfully minted!');
        // 추가 로직...

        // 부모 컴포넌트로 minted NFT 정보 전달
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
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <button onClick={handleMint}>Mint NFT</button>
    </div>
  );
};

export default MintNFTForm;
