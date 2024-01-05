import { NFTStorage } from 'nft.storage';

interface NFT {
  id: number;
  image: string;
  name: string;
  description: string;
}

export const uploadToNFTStorage = async (file: File, name: string, description: string) => {
  const apiKey = process.env.NEXT_PUBLIC_IPFS_API_KEY||"";
  const client = new NFTStorage({ token: apiKey });

  const metadata = await client.store({
    name: name,
    description: description,
    image: file,
  })
  return metadata.url;
};

export const getToNFTStorage = async (tokenId: number, uri: string): Promise<NFT | undefined> => {
  const metadataUri = uri.replace('ipfs://', 'https://').replace("/metadata.json", ".ipfs.nftstorage.link/metadata.json");
  try {
    const response = await fetch(metadataUri);
    const data = await response.json();
    const nft: NFT = {
      id : tokenId,
      image : data.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
      name : data.name,
      description : data.description
    }
    return nft;
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
};