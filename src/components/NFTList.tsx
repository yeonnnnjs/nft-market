import { useEffect, useState } from 'react';
import TransferNFTForm from './TransferNFTForm';

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
  }

const NFTList = ({ list, isMyNFTs }) => {
    const [modalType, setModalType] = useState(0);
    const [selectedNFT, setSelectedNFT] = useState(null);
    const [filteredNFTList, setFilteredNFTList] = useState<NFT[]>(list);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNFTSelect = (index: number, type: boolean) => {
        setModalType(type);
        setSelectedNFT(list[index]);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const filteredNFTs = list.filter((nft) =>
          nft.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNFTList(filteredNFTs);
      }, [searchTerm, list]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-full flex items-center justify-center mt-4">
                <input
                    type="text"
                    placeholder="NFT 검색"
                    className="p-2 border border-gray-300 rounded-md"
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
                        <img
                            src={nft.image}
                            alt={nft.name}
                            className="mb-2 rounded-md"
                            loading="lazy"
                        />
                        <div className="flex flex-col h-full items-center">
                            <h2 className="text-lg font-semibold">{nft.name}</h2>
                            <p className="text-gray-500">{nft.description}</p>
                            <button onClick={() => handleNFTSelect(index, true)} className="text-blue-500">
                                상세보기
                            </button>
                            {isMyNFTs && <button onClick={() => handleNFTSelect(index, false)} className="text-blue-500">전송하기</button>}
                        </div>
                    </div>
                ))
            )}

            {isModalOpen && (
                (modalType ? (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <img src={selectedNFT?.image} alt={selectedNFT?.name} className="mb-2 rounded-md" />
                            <h2 className="text-lg font-semibold">{selectedNFT?.name}</h2>
                            <p className="text-gray-500">{selectedNFT?.description}</p>
                            <button onClick={handleCloseModal} className="text-blue-500">닫기</button>
                        </div>
                    </div>
                ) : (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <TransferNFTForm nftId={selectedNFT.id} />
                            <button onClick={handleCloseModal} className="text-blue-500">닫기</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NFTList;
