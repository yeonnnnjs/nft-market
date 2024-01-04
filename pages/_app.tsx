import { AccountProvider } from '@/src/context/AccountContext';
import { ErrorProvider } from '@/src/context/ErrorContext';
import type { AppProps } from "next/app";
import Head from 'next/head';
import Layout from '@/src/components/Layout';

function NftMarket({ Component, pageProps }: AppProps) {
    return (
        <ErrorProvider>
            <AccountProvider>
                <>
                    <Head>
                        <title>NFT Marketplace</title>
                        <meta name="description" content="NFT Marketplace by yeonnnnjs" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </>
            </AccountProvider>
        </ErrorProvider>
    );
}

export default NftMarket;
