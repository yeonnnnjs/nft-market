import React, { useEffect, useState } from 'react';
import Carousel from "@/src/components/Carousel";
import { GetAllNFTs } from "@/src/utils/contractApi";
import SimpleNFTList from "@/src/components/SimpleNFTList";
import { useRouter } from "next/router";

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
    nftId: string;
}

interface MainProps {
    nftList: NFT[];
}

const Main: React.FC<MainProps> = ({ nftList }: MainProps) => {
    const router = useRouter();

    return (
        <div className="pt-[8vh] w-full max-w-screen mx-auto px-4">
            <Carousel items={nftList} />
            <div className="max-w-screen-lg mx-auto">
                <h1 className="text-3xl font-bold my-4">NFT Marketplace</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={() => router.push("/nft/all")} >NFT 전체보기</button>
                <SimpleNFTList list={nftList} />
            </div>
        </div>
    );
}

export const getStaticProps = async () => {
    const nftList = await GetAllNFTs();
    return {
        props: {
            nftList
        },
        revalidate: 10
    }
}

export default Main;
