import { getAllNftIdToPaths, getMetadataByNftId } from '@/src/utils/contractApi';
import TransferNFTForm from '../../src/components/TransferNFTForm';

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
}

const DetailNFT = ({nft}) => {
    return (
        <div className='pt-[8vh]'>
            <div className="bg-white p-4 rounded-md shadow-md w-50 h-50">
                <img src={nft?.image} alt={nft?.name} className="mb-2 rounded-md" />
                <h2 className="text-lg font-semibold">{nft?.name}</h2>
                <p className="text-gray-500">{nft?.description}</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
                <TransferNFTForm nftId={nft?.id} />
            </div>
        </div>
    );
};

export const getStaticPaths = async () => {
    const paths = await getAllNftIdToPaths();
    return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
    const metadata = await getMetadataByNftId(params.nftId);
    return {
        props: {
            nft: metadata
        }
    }
}

export default DetailNFT;
