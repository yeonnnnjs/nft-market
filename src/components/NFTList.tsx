import { useEffect, useState } from 'react';
import Image from "next/image";

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

const NFTList: React.FC<NFTListProps> = ({ list }) => {
    const [filteredNFTList, setFilteredNFTList] = useState<NFT[]>(list);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredNFTs = list.filter((nft) =>
            nft.name ? nft.name.toLowerCase().includes(searchTerm.toLowerCase()) : ""
        );
        setFilteredNFTList(filteredNFTs);
    }, [searchTerm, list]);

    return (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-20">
            <div className="col-span-full flex items-center justify-center mt-4 gap-4">
                <input
                    type="text"
                    placeholder="NFT 검색"
                    className="p-2 w-1/2 border border-gray-300 rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {!filteredNFTList.length ? (
                <div className="col-span-full flex items-center justify-center mt-4">
                    <div className="bg-gray-100 p-8 rounded-md shadow-md">
                        <h1 className="text-xl font-semibold text-gray-600">NFT가 없습니다!</h1>
                    </div>
                </div>
            ) : (
                filteredNFTList.map((nft) => (
                    <div key={nft.nftId} className="bg-white p-4 rounded-md shadow-md cursor-pointer" onClick={() => location.href=`/nft/${nft.nftId}`}>
                            <div className="relative h-32 mb-4 rounded-md overflow-hidden">
                                <Image src={nft.image} alt={nft.name} fill={true} priority={true} className="object-cover" placeholder="blur" blurDataURL={'/public/vercel.svg'}/>
                            </div>
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-semibold">{nft.name}</h2>
                                <p className="text-gray-500">{nft.description}</p>
                            </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NFTList;
