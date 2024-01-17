import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import Layout from '@/components/layout';
import { Toaster } from 'sonner'

const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit Next.js demo',
    //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [mainnet, polygon, optimism, arbitrum],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="midnight"
        customTheme={{
          "--ck-font-family": '"Comic Sans MS", "Comic Sans", cursive',
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
    </WagmiConfig>
  );
}

export default MyApp;