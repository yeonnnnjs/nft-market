import { useState, useEffect } from 'react';
import { useAccount } from './context/AccountContext';

const MyNFTs = () => {
  const [myNFTs, setMyNFTs] = useState<string[]>([]);
  const {account} = useAccount();

  useEffect(() => {
    const fetchMyNFTs = async () => {
      if (account) {
        const nftContract = {} as any;
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
