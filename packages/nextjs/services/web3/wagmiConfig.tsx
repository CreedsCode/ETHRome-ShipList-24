import { wagmiConnectors } from "./wagmiConnectors";
import { createConfig } from "@privy-io/wagmi";
import { Chain, createClient, http } from "viem";
import { hardhat, mainnet } from "viem/chains";
import scaffoldConfig from "~~/scaffold.config";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";

const { targetNetworks } = scaffoldConfig;

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = targetNetworks.find((network: Chain) => network.id === 1)
  ? targetNetworks
  : ([...targetNetworks, mainnet] as const);

export const wagmiConfig = createConfig({
  chains: enabledChains,
  connectors: wagmiConnectors,
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(getAlchemyHttpUrl(chain.id)),
      ...(chain.id !== (hardhat as Chain).id
        ? {
            pollingInterval: scaffoldConfig.pollingInterval,
          }
        : {}),
    });
  },
});
