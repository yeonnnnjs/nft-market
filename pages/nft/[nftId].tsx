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
        <div className='pt-[8vh] flex items-center justify-center flex-col gap-4'>
            <div className="flex w-full h-full">
                <div className="bg-white p-8 rounded-md shadow-md w-1/2">
                    <img src={nft?.image} alt={nft?.name} className="mb-4 rounded-md w-full h-full object-cover"/>
                </div>

                <div className="bg-white p-8 rounded-md shadow-md w-1/2">
                    <h2 className="text-3xl font-semibold mb-2">{nft?.name}</h2>
                    <p className="text-lg text-gray-500 mb-4">{nft?.description}</p>
                </div>
            </div>
            <div className="flex w-full h-full">
                <div className="bg-white p-8 rounded-md shadow-md w-full">
                    <TransferNFTForm nftId={nft?.id}/>
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await GetAllNftIdToPaths();
    return {paths, fallback: true};
}

export const getStaticProps: GetStaticProps = async ({params}) => {
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
