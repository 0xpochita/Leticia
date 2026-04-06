"use client"

import type { PropsWithChildren } from "react"
import { useEffect } from "react"
import { createConfig, http, WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  initiaPrivyWalletConnector,
  injectStyles,
  InterwovenKitProvider,
  TESTNET,
} from "@initia/interwovenkit-react"
import interwovenKitStyles from "@initia/interwovenkit-react/styles.js"
import {
  leticiaEvmChain,
  LETICIA_ROLLUP,
  LETICIA_CUSTOM_CHAIN,
} from "@/config/network"

const wagmiConfig = createConfig({
  connectors: [initiaPrivyWalletConnector],
  chains: [leticiaEvmChain],
  transports: {
    [leticiaEvmChain.id]: http(LETICIA_ROLLUP.jsonRpc),
  },
})

const queryClient = new QueryClient()

export function InterwovenProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    injectStyles(interwovenKitStyles)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <InterwovenKitProvider
          {...TESTNET}
          defaultChainId={LETICIA_ROLLUP.chainId}
          customChain={LETICIA_CUSTOM_CHAIN}
          theme="light"
          disableAnalytics
        >
          {children}
        </InterwovenKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
