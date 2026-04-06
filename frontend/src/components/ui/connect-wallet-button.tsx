"use client"

import { useInterwovenKit } from "@initia/interwovenkit-react"
import { WalletIcon } from "lucide-react"

export function ConnectWalletButton() {
  const { address, isConnected, openConnect, openWallet } = useInterwovenKit()

  if (!isConnected) {
    return (
      <button
        type="button"
        onClick={openConnect}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-foreground px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        <WalletIcon className="size-4" />
        Connect Wallet
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={openWallet}
      className="flex cursor-pointer items-center gap-2 rounded-full border border-foreground px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
    >
      <WalletIcon className="size-4" />
      {address.slice(0, 8)}...{address.slice(-4)}
    </button>
  )
}
