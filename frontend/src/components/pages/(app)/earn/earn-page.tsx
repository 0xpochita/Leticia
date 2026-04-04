"use client"

import Image from "next/image"
import { ArrowRightIcon, LockIcon } from "lucide-react"

interface EarnAsset {
  name: string
  subtitle: string
  logo: string
  apr: string
  deposited: string
  badge?: "lock"
}

const assets: EarnAsset[] = [
  {
    name: "INIT-USDC LP",
    subtitle: "Enshrined Liquidity",
    logo: "/Assets/Images/Logo/init-logo.webp",
    apr: "12%",
    deposited: "124.5K",
  },
  {
    name: "esINIT",
    subtitle: "VIP Rewards",
    logo: "/Assets/Images/Logo/init-logo.png",
    apr: "7%",
    deposited: "68.2K",
    badge: "lock",
  },
  {
    name: "sINIT",
    subtitle: "Liquid Staking",
    logo: "/Assets/Images/Logo/inertia-logo.png",
    apr: "15%",
    deposited: "215.8K",
  },
]

export function EarnPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="overflow-hidden rounded-3xl border border-foreground/10">
        <div className="bg-foreground px-8 py-10">
          <h1 className="text-2xl font-bold tracking-tight text-background md:text-3xl">
            Select an asset to
            <br />
            Deposit &amp; Earn
          </h1>
        </div>

        <div className="divide-y divide-foreground/5 bg-background">
          {assets.map((asset) => (
            <div
              key={asset.name}
              className="flex items-center gap-4 px-6 py-5 transition-colors hover:bg-foreground/[0.02] md:gap-6 md:px-8"
            >
              <div className="relative shrink-0">
                <Image
                  src={asset.logo}
                  alt={asset.name}
                  width={44}
                  height={44}
                  className="size-11 rounded-full"
                />
                {asset.badge === "lock" && (
                  <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-foreground text-background">
                    <LockIcon className="size-3" />
                  </span>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {asset.name}
                </span>
                <span className="text-xs text-foreground/40">
                  {asset.subtitle}
                </span>
              </div>

              <div className="hidden flex-col items-end sm:flex">
                <span className="text-lg font-bold tabular-nums text-foreground">
                  {asset.apr}
                </span>
                <span className="text-[10px] text-foreground/40">
                  Annual fixed return
                </span>
              </div>

              <div className="hidden flex-col items-end md:flex">
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {asset.deposited}
                </span>
                <span className="text-[10px] text-foreground/40">
                  Deposited
                </span>
              </div>

              <button
                type="button"
                className="flex cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Open Deposit
                <ArrowRightIcon className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
