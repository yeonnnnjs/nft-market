import React from 'react';
import TransferNFTForm from '../../src/components/TransferNFTForm';
import { GetStaticPaths, GetStaticProps } from 'next';
import { GetAllNftIdToPaths, GetMetadataByNftId } from '@/src/utils/contractApi';
import {useAccount} from "@/src/context/AccountContext";

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
    nftId: string;
    owner: string;
}

const DetailNFT: React.FC<NFT> = (nft) => {
    const { account } = useAccount();

    return (
        <div className='pt-[8vh] flex items-center justify-center flex-col gap-4'>
            <div className="flex w-full h-full">
                <div className="bg-white p-8 rounded-md shadow-md w-1/2">
                    <img src={nft?.image} alt={nft?.name} className="mb-4 rounded-md w-full h-full object-cover"/>
                </div>

                <div className="bg-white p-8 rounded-md shadow-md w-1/2">
                    <h2 className="text-3xl font-semibold mb-2">{nft?.name}</h2>
                    <p className="text-lg text-gray-500 mb-4">{nft?.description}</p>
                    <p className="text-lg text-gray-500 mb-4">{nft?.owner}</p>
                </div>
            </div>
            {nft?.owner.toLowerCase() == account ? (
                <div className="flex w-full h-full">
                    <div className="bg-white p-8 rounded-md shadow-md w-full">
                        <TransferNFTForm nftId={nft?.id}/>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await GetAllNftIdToPaths();
    return {paths, fallback: false};
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const metadata = await GetMetadataByNftId(params?.nftId as string);
    console.log(metadata);
    if (!metadata) {
        return {
            notFound: true,
        };
    } else {
        return {
            props: {
                id: metadata.metadata?.id,
                image: metadata.metadata?.image,
                name: metadata.metadata?.name,
                description: metadata.metadata?.description,
                owner: metadata.owner
            }
        }
    }
}

export default DetailNFT;
