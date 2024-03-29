import Head from 'next/head';
import Navbar from './header';
import { useAccount } from "wagmi";
import OnBoarding from './onboarding/OnBoarding';
import { useEffect, useState } from 'react';

const Layout = (props: any) => {

    const { isConnected } = useAccount();
    const [clientSide, setClientSide] = useState(false);

    useEffect(() => {
        // This will set clientSide to true only after the component mounts,
        // ensuring that the server-rendered content matches the initial client-rendered content.
        setClientSide(true);
    }, []);


    return (
        <>
            <Head>
                <title>Ghothique</title>
                <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ghothique.xyz" />
                <meta property="og:title" content="Ghothique" />
                <meta property="og:description" content="Web3 investments made simple." />
                <meta property="og:image" content="https://nftstorage.link/ipfs/bafkreic6vapgnpvmemyjnhpmrzh6ap3nlwerw47xkhhyqjlbqcwnklyrbi" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@erikfazj" />
                <meta name="twitter:title" content="Ghothique" />
                <meta name="twitter:description" content="Web3 investments made simple." />
                <meta name="twitter:image" content="https://nftstorage.link/ipfs/bafkreic6vapgnpvmemyjnhpmrzh6ap3nlwerw47xkhhyqjlbqcwnklyrbi" />
                <link rel="manifest" href="/manifest.json" />

            </Head>
            {
                clientSide && isConnected ?
                    <div>
                        <Navbar />
                        <main className='min-h-[92dvh] bg-[#0b111b] pb-4 md:pb-16'>
                            {props.children}
                        </main>
                    </div>
                    :
                    clientSide && !isConnected ?
                        <div>
                            <OnBoarding />
                        </div>
                        : null
            }
        </>
    )
};
export default Layout;
