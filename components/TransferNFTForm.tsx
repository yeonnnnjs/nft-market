// components/TransferNFTForm.tsx
import { useState } from 'react';

interface TransferNFTFormProps {
  onTransfer: (to: string, nftId: number) => void;
}

const TransferNFTForm: React.FC<TransferNFTFormProps> = ({ onTransfer }) => {
  const [to, setTo] = useState('');
  const [nftId, setNftId] = useState<number>(0);

  const handleTransfer = () => {
    onTransfer(to, nftId);
    // Add logic to transfer NFT
  };

  return (
    <div>
      <label>
        To:
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      </label>
      <label>
        NFT ID:
        <input type="number" value={nftId} onChange={(e) => setNftId(Number(e.target.value))} />
      </label>
      <button onClick={handleTransfer}>Transfer NFT</button>
    </div>
  );
};

export default TransferNFTForm;
