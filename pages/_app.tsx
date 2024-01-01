import { AccountProvider } from '@/src/components/context/AccountContext';
import { useState } from 'react';
import Main from '@/pages/index'
import Head from 'next/head';
import NavBar from '@/src/components/NavBar';

function NftMarket() {
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('MyNFTs');

    const handleSelectMenuItem = (menuItem: string) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <AccountProvider>
            <div>
                <Head>
                    <title>NFT Marketplace</title>
                    <meta name="description" content="NFT Marketplace by yeonnnnjs" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <NavBar onSelectMenuItem={handleSelectMenuItem} />
                <Main selectedMenuItem={selectedMenuItem} />
            </div>
        </AccountProvider>
    );
}

export default NftMarket;
