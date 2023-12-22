// components/MyNFTs.tsx
import { useState, useEffect } from 'react';

interface MyNFTsProps {
  account: string | null;
}

const MyNFTs: React.FC<MyNFTsProps> = ({ account }) => {
  const [myNFTs, setMyNFTs] = useState<string[]>([]);

  useEffect(() => {
    // Add logic to fetch NFTs owned by the account
    // For simulation, let's assume an array of NFT IDs
    const fetchMyNFTs = async () => {
      if (account) {
        // Simulate fetching NFTs from a contract
        const nftContract = {} as any; // Replace with your NFT contract instance
        const balance = await nftContract.balanceOf(account);
        const nftIds = await Promise.all(
          Array.from({ length: balance.toNumber() }, (_, index) =>
            nftContract.tokenOfOwnerByIndex(account, index)
          )
        );
        setMyNFTs(nftIds.map((id: any) => id.toNumber()));
      }
    };

    fetchMyNFTs();
  }, [account]);

  return (
    <div>
      {account && myNFTs.length > 0 && (
        <div>
          <p>My NFTs:</p>
          <ul>
            {myNFTs.map((nftId) => (
              <li key={nftId}>NFT ID: {nftId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
