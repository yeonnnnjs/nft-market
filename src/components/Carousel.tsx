import React, { useEffect, useState } from 'react';
import Image from "next/image";

interface NFT {
    id: number;
    image: string;
    name: string;
    description: string;
    nftId: string;
}

interface CarouselProps {
    items: NFT[];
}

const Carousel: React.FC<CarouselProps> = ({ items }: CarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const nftList = items.slice(-6);
    console.log(nftList);
    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? nftList.length - 1 : prevSlide - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === nftList.length - 1 ? 0 : prevSlide + 1));
    };

    return (
        <div className="relative overflow-hidden -z-10">
            <div className="flex items-center">
                {nftList.map((item) => (
                    <div
                        key={item.nftId}
                        style={{transform: `translateX(-${100 * currentSlide}%)`}}
                        className="flex-shrink-0 w-full h-72 transition-transform duration-500 -z-20"
                    >
                        <div className="relative h-full -z-30">
                            <Image src={item.image} alt={item.nftId} priority={true} fill={true} className="object-cover rounded-md -z-40"/>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2"
                    onClick={handlePrev}>
                &lt; Prev
            </button>
            <button className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2"
                    onClick={handleNext}>
                Next &gt;
            </button>
        </div>
    );
};

export default Carousel;
