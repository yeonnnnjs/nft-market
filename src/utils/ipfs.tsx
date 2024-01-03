import { NFTStorage } from 'nft.storage';

export const uploadToNFTStorage = async (file: File, name: string, description: string) => {
  const apiKey = process.env.NEXT_PUBLIC_IPFS_API_KEY;
  const client = new NFTStorage({ token: apiKey });

  const metadata = await client.store({
    name: name,
    description: description,
    image: file,
  })
  return metadata.url;
};

export const getToNFTStorage = async (tokenId: number, uri: string) => {
  const metadataUri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');

  try {
    const response = await fetch(metadataUri);
    const data = await response.json();

    const nft = {
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