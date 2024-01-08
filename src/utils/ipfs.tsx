interface NFT {
  id: number;
  image: string;
  name: string;
  description: string;
}

export const getToNFTStorage = async (tokenId: number, uri: string): Promise<NFT | undefined> => {
  const metadataUri = uri.replace('ipfs://', 'https://').replace("/metadata.json", ".ipfs.nftstorage.link/metadata.json");
  try {
    const response = await fetch(metadataUri);
    const data = await response.json();
    const nft: NFT = {
      id : parseFloat(tokenId),
      image : data.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
      name : data.name,
      description : data.description
    }
    return nft;
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
};