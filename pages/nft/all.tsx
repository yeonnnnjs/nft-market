import NFTList from '../../src/components/NFTList';
import 'tailwindcss/tailwind.css';
import { getAllNFTs } from '@/src/utils/contractApi';

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
