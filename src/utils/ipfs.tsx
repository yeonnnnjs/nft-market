import { NFTStorage } from 'nft.storage'

async function uploadToNFTStorage(file: File, name: string, description: string) {
  const apiKey = process.env.NEXT_PUBLIC_IPFS_API_KEY;
  const client = new NFTStorage({ token: apiKey });

  const metadata = await client.store({
    name: name,
    description: description,
    image: file,
  })
  console.log(metadata.data);

  return metadata.data;
}

export default uploadToNFTStorage;