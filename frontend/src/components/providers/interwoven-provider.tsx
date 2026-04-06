"use client"

import type { PropsWithChildren } from "react"
import { useEffect } from "react"
import { createConfig, http, WagmiProvider } from "wagmi"
import { mainnet } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  initiaPrivyWalletConnector,
  injectStyles,
  InterwovenKitProvider,
  MAINNET,
} from "@initia/interwovenkit-react"
import interwovenKitStyles from "@initia/interwovenkit-react/styles.js"

const wagmiConfig = createConfig({
  connectors: [initiaPrivyWalletConnector],
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
})

const queryClient = new QueryClient()

export function InterwovenProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    injectStyles(interwovenKitStyles)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <InterwovenKitProvider {...MAINNET} theme="light" disableAnalytics>
          {children}
        </InterwovenKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
