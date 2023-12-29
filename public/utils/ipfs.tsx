async function uploadToNFTStorage(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IPFS_API_KEY;
  const endpoint = 'https://api.nft.storage/upload';

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload to NFT.storage. Status: ${response.status}`);
  }

  const result = await response.json();
  return `https://${result.value.cid}.ipfs.nftstorage.link`;
}

export default uploadToNFTStorage;
