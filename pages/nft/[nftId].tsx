import React from 'react';
import TransferNFTForm from '../../src/components/TransferNFTForm';
import { GetStaticPaths, GetStaticProps } from 'next';
import { GetAllNftIdToPaths, GetMetadataByNftId } from '@/src/utils/contractApi';

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
}

const DetailNFT: React.FC<NFT> = (nft) => {
    return (
        <div className='pt-[8vh] flex flex-col items-center'>
            <div className="bg-white p-8 rounded-md shadow-md mb-8 max-w-2xl">
                <img src={nft?.image} alt={nft?.name} className="mb-4 rounded-md w-full h-96 object-cover" />
                <h2 className="text-3xl font-semibold mb-2">{nft?.name}</h2>
                <p className="text-lg text-gray-500">{nft?.description}</p>
            </div>
            <div className="bg-white p-8 rounded-md shadow-md max-w-2xl">
                <TransferNFTForm nftId={nft?.id} />
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await GetAllNftIdToPaths();
    return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const metadata = await GetMetadataByNftId(params?.nftId as string);
    if (!metadata) {
        return {
            notFound: true,
        };
    } else {
        return {
            props: {
                id: metadata?.id,
                image: metadata?.image,
                name: metadata?.name,
                description: metadata?.description
            }
        }
    }
}

export default DetailNFT;
