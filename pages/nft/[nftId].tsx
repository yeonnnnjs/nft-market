import TransferNFTForm from '../../src/components/TransferNFTForm';

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
}

const DetailNFT = (nft: NFT) => {
    return (
        <div className="w-full h-full">
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
    const response = await fetch(process.env.NEXT_PUBLIC_ADDRESS + "/api/nftlist/getnum");
    const { length } = await response.json();
    const paths = Array.from({ length }, (_, index) => ({ params: { nftId: index.toString() } }));
    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const { params } = context;
    const nftId = params.nftId;
    console.log(context);
    const response = await fetch(process.env.NEXT_PUBLIC_ADDRESS + "/api/nft/" + nftId);
    const metadata = await response.json();
    return {
        props: {
            nft: metadata
        }
    }
}

export default DetailNFT;
