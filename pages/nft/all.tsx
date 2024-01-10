import NFTList from '../../src/components/NFTList';
import 'tailwindcss/tailwind.css';
import { GetAllNFTs } from '@/src/utils/contractApi';

interface NFT {
  id: number;
  image: string;
  name: string;
  description: string;
  nftId: string;
  owner: string;
}

interface AllNFTsProps {
  nftList: NFT[];
}

const AllNFTs = ({nftList}: AllNFTsProps) => {
  return (
    <div className='pt-[8vh]'>
      <NFTList list={nftList} />
    </div>
  );
};

export const getStaticProps = async () => {
  const nftList = await GetAllNFTs();
  return {
    props: {
      nftList
    },
    revalidate: 10
  }
}

export default AllNFTs;