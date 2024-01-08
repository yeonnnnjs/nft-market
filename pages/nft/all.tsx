import NFTList from '../../src/components/NFTList';
import 'tailwindcss/tailwind.css';
import { getAllNFTs } from '@/src/utils/contractApi';

interface NFT {
  id: number;
  image: string;
  name: string;
  description: string;
  nftId: string;
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
  const nftList = await getAllNFTs();
  return {
    props: {
      nftList
    }
  }
}

export default AllNFTs;
