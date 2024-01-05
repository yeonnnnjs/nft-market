import NFTList from '../../src/components/NFTList';
import 'tailwindcss/tailwind.css';
import { getAllNFTs } from '../api/nftApis';

interface NFT {
  id: number;
  image: string;
  name: string;
  description: string;
}

const AllNFTs = ({nftList}) => {
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
