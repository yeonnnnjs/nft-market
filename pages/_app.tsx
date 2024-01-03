import { AccountProvider } from '@/src/context/AccountContext';
import { ErrorProvider } from '@/src/context/ErrorContext';
import { useState, useEffect } from 'react';
import Main from '@/pages/index'
import Head from 'next/head';
import NavBar from '@/src/components/NavBar';

function NftMarket() {
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('AllNFTs');

    const handleSelectMenuItem = (menuItem: string) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <ErrorProvider>
            <AccountProvider>
                <>
                    <Head>
                        <title>NFT Marketplace</title>
                        <meta name="description" content="NFT Marketplace by yeonnnnjs" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <NavBar onSelectMenuItem={handleSelectMenuItem} />
                    <Main selectedMenuItem={selectedMenuItem} />
                </>
            </AccountProvider>
        </ErrorProvider>
    );
}

export default NftMarket;
