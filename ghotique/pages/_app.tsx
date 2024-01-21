import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WagmiConfig, createConfig, sepolia } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import Layout from '@/components/layout';
import { Toaster } from 'sonner'
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";


const config = createConfig(
  getDefaultConfig({
    appName: 'Ghothique',
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [sepolia, mainnet, polygon, optimism, arbitrum],
    walletConnectProjectId: "e529e3d10c022978967188ab28b77b3f",
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ThirdwebProvider
        activeChain={Sepolia}
        clientId={"578c70b3c62e89569ef212bdf3261dd5"}
      >
        <ConnectKitProvider theme="midnight"
          customTheme={{
            "--ck-connectbutton-font-size": "14px",
            "--ck-connectbutton-background": "#0b111b",
            "--ck-connectbutton-hover-background": "#101827",
            "--ck-body-background": "#0b111b"
          }}
        >
          <Layout>
            <Toaster richColors />
            <Component {...pageProps} />
          </Layout>
        </ConnectKitProvider>
      </ThirdwebProvider>
    </WagmiConfig>

  );
}

export default MyApp;