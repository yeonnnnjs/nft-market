interface NFT {
  id: number | null;
  image: string | null;
  name: string | null;
  description: string | null;
}

export const getToNFTStorage = async (tokenId: number, uri: string): Promise<NFT | undefined> => {
  const metadataUri = uri.replace('ipfs://', 'https://').replace("/metadata.json", ".ipfs.nftstorage.link/metadata.json");
  try {
    const response = await fetch(metadataUri);
    const data = await response.json();

    const nft: NFT = {
      id : tokenId,
      image : convertIpfsUrlToNftStorage(data.image),
      name : data.name,
      description : data.description
    }
    return nft;
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
};

function convertIpfsUrlToNftStorage(ipfsUrl: string) {
  const ipfsHashRegex = /ipfs:\/\/([a-zA-Z0-9]*)/;
  const ipfsMatch = ipfsUrl.match(ipfsHashRegex);

  const fileNameRegex = /\/([^/]+)$/;
  const fileNameMatch = ipfsUrl.match(fileNameRegex);

  if (!ipfsMatch || !fileNameMatch) {
    return null;
  }

  const ipfsHash = ipfsMatch[1];
  const fileName = fileNameMatch[1];
  const nftStorageUrl = `https://${ipfsHash}.ipfs.nftstorage.link/${fileName}`;

  return nftStorageUrl;
}