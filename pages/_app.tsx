import { AccountProvider } from '@/src/components/context/AccountContext';
import Main from '@/pages/index'
import Head from 'next/head';

function NftMarket() {
    return (
        <AccountProvider>
            <div>
                <Head>
                    <title>NFT Marketplace</title>
                    <meta name="description" content="NFT Marketplace by yeonnnnjs" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Main />
            </div>
        </AccountProvider>
    );
}

export default NftMarket;
