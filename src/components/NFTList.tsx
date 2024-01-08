import { useEffect, useState } from 'react';
import { useAccount } from '../context/AccountContext';
import Link from 'next/link';

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
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
    console.log(list);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-20">
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
                filteredNFTList.map((nft, index) => (
                    <div key={index} className="bg-white p-4 rounded-md shadow-md flex flex-col items-center justify-between">
                        <Link href={`/nft/${encodeURIComponent(nft.nftId)}`}>
                            <img
                                src={nft.image}
                                alt={nft.name}
                                className="mb-2 rounded-md"
                                loading="lazy"
                            />
                            <div className="flex flex-col h-full items-center">
                                <h2 className="text-lg font-semibold">{nft.name}</h2>
                                <p className="text-gray-500">{nft.description}</p>
                            </div>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default NFTList;
