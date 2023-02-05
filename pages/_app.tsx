import type { AppProps } from "next/app";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ThemeProvider } from "@mui/system";
import { theme } from "../styles/theme";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.scss";

const hyperspace: Chain = {
  id: 3_141,
  name: "Hyperspace",
  network: "Hyperspace",
  nativeCurrency: {
    decimals: 18,
    name: "Filecoin",
    symbol: "tFIL",
  },
  rpcUrls: {
    default: {
      http: ["https://filecoin-hyperspace.chainstacklabs.com/rpc/v1"],
      webSocket: [""],
    },
    public: {
      http: ["https://filecoin-hyperspace.chainstacklabs.com/rpc/v1"],
      webSocket: [""],
    },
  },
};

const { chains, provider } = configureChains(
  [hyperspace],
  [alchemyProvider({ apiKey: "8TN4uRz1cIbyDUgHZ80u0tKdQA2Qsc8j" }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Heroes of Wallaby",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
