// components/MintNFTForm.tsx
import { useState } from 'react';

interface MintNFTFormProps {
  onMint: (image: string, title: string) => void;
}

const MintNFTForm: React.FC<MintNFTFormProps> = ({ onMint }) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');

  const handleMint = () => {
    onMint(image, title);
    // Add logic to mint NFT
  };

  return (
    <div>
      <label>
        Image URL:
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
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
