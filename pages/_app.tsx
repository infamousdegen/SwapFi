import "./styles/global.css";
import { AppProps } from "next/app";
import Layout from "@/components/Layout";
import UnifiedNavbar from "@/components/UnifiedNavbar";
import { url } from "inspector";
import "@rainbow-me/rainbowkit/styles.css";
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  xdcTestnet,
  xdc,
} from 'wagmi/chains';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { http } from "viem";

const { chains, publicClient } = configureChains(
  [xdcTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://erpc.apothem.network",
      }),
    }),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'SwapFi',
  projectId: '0d14b50049d1cc2cd65249d04099fc27',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
          <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode theme={darkTheme({
        accentColor: 'linear-gradient(13deg, rgba(91,39,236,0.8435968137254902) 0%, rgba(185,32,169,0.4710477941176471) 100%)',
        accentColorForeground: 'white',
        borderRadius: 'medium',
      })}chains={chains}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
