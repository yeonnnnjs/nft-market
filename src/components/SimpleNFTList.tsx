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
                <div key={nft.id} className="bg-white p-4 rounded-md shadow-md cursor-pointer" onClick={() => location.href=`/nft/${nft.nftId}`}>
                    <div className="relative h-32 mb-4 rounded-md overflow-hidden">
                        <Image src={nft.image} alt={nft.name} fill={true} priority={true} className="object-cover"/>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
                    <p className="text-gray-500">{nft.description}</p>
                </div>
            ))}
        </div>
    );
}

export default SimpleNFTList;
