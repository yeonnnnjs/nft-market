import React from 'react';
import Image from "next/image";
import Link from 'next/link';

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
    nftId: string;
}

interface NFTListProps {
    list: NFT[];
}

const SimpleNFTList: React.FC<NFTListProps> = ({ list }: NFTListProps) => {
    const nftList = list.slice(-6);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nftList.map((nft) => (
                <div key={nft.id} className="bg-white p-4 rounded-md shadow-md">
                    <Link href={`/nft/${encodeURIComponent(nft.nftId)}`}>
                    <div className="relative h-32 mb-4 rounded-md overflow-hidden">
                        <Image src={nft.image} alt={nft.name} fill={true} objectFit={"cover"}/>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
                    <p className="text-gray-500">{nft.description}</p>
                    {/*<div className="mt-4 flex justify-between items-center">*/}
                    {/*    <button className="bg-blue-500 text-white px-3 py-1 rounded-md">상세 보기</button>*/}
                    {/*    <span className="text-gray-600">{nft.nftId}</span>*/}
                    {/*</div>*/}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default SimpleNFTList;
