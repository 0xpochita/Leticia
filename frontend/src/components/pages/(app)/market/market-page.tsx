"use client"

import { useState } from "react"
import Image from "next/image"
import { InfoIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarketAsset {
  name: string
  subtitle: string
  logo: string
  maturity: string
  daysLeft: number
  liquidity: string
  ytLeverage: string
  ytPrice: string
  ytImplied: string
  ptPrice: string
  fixedApr: string
}

const markets: MarketAsset[] = [
  {
    name: "INIT-USDC LP",
    subtitle: "Enshrined Liquidity",
    logo: "/Assets/Images/Logo/init-logo.png",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    liquidity: "$124,500",
    ytLeverage: "x42",
    ytPrice: "$0.024",
    ytImplied: "x18",
    ptPrice: "$0.97",
    fixedApr: "12.4%",
  },
  {
    name: "esINIT",
    subtitle: "VIP Rewards",
    logo: "/Assets/Images/Logo/init-logo.png",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    liquidity: "$68,200",
    ytLeverage: "x28",
    ytPrice: "$0.036",
    ytImplied: "x12",
    ptPrice: "$0.96",
    fixedApr: "7.2%",
  },
  {
    name: "sINIT",
    subtitle: "Liquid Staking",
    logo: "/Assets/Images/Logo/inertia-logo.png",
    maturity: "30 Sep 2026",
    daysLeft: 179,
    liquidity: "$215,800",
    ytLeverage: "x65",
    ytPrice: "$0.015",
    ytImplied: "x25",
    ptPrice: "$0.98",
    fixedApr: "15.1%",
  },
]

export function MarketPage() {
  const [tab, setTab] = useState<"active" | "inactive">("active")

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Market
      </h1>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/60">
        Fix your yield with <strong className="text-foreground">PT tokens</strong> or go
        long on yield with leveraged{" "}
        <strong className="text-foreground">YT tokens (high risk)</strong>.
        Choose a protocol and take control of your earnings.
      </p>

      <div className="mt-8 flex items-center gap-1 rounded-full border border-foreground/10 p-1 w-fit">
        <button
          type="button"
          onClick={() => setTab("active")}
          className={cn(
            "cursor-pointer rounded-full px-5 py-1.5 text-sm font-medium transition-colors",
            tab === "active"
              ? "bg-foreground text-background"
              : "text-foreground/50 hover:text-foreground",
          )}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setTab("inactive")}
          className={cn(
            "cursor-pointer rounded-full px-5 py-1.5 text-sm font-medium transition-colors",
            tab === "inactive"
              ? "bg-foreground text-background"
              : "text-foreground/50 hover:text-foreground",
          )}
        >
          Inactive
        </button>
      </div>

      <div className="mt-8">
        <div className="hidden items-center border-b border-foreground/10 pb-3 text-xs text-foreground/40 md:grid md:grid-cols-12 md:gap-4 md:px-6">
          <div className="col-span-3">Asset</div>
          <div className="col-span-2">
            Maturity <InfoIcon className="mb-0.5 ml-1 inline size-3" />
          </div>
          <div className="col-span-1 text-right">Liquidity</div>
          <div className="col-span-3 text-center">
            Long Yield with Leverage <InfoIcon className="mb-0.5 ml-1 inline size-3" />
          </div>
          <div className="col-span-3 text-right">
            Fixed APR <InfoIcon className="mb-0.5 ml-1 inline size-3" />
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-3">
          {tab === "active" ? (
            markets.map((asset) => <MarketRow key={asset.name} asset={asset} />)
          ) : (
            <p className="py-12 text-center text-sm text-foreground/40">
              No inactive markets
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function MarketRow({ asset }: { asset: MarketAsset }) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-5 transition-colors hover:bg-foreground/[0.04] md:grid-cols-12">
      <div className="col-span-3 flex items-center gap-3">
        <Image
          src={asset.logo}
          alt={asset.name}
          width={40}
          height={40}
          className="size-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">{asset.name}</p>
          <p className="text-xs text-foreground/40">{asset.subtitle}</p>
        </div>
      </div>

      <div className="col-span-2">
        <p className="text-sm font-medium text-foreground">{asset.maturity}</p>
        <p className="text-xs text-foreground/40">{asset.daysLeft} days</p>
      </div>

      <div className="col-span-1 text-right text-sm font-medium text-foreground">
        {asset.liquidity}
      </div>

      <div className="col-span-3 flex items-center justify-center gap-2">
        <span className="rounded-full bg-foreground/5 px-3 py-1.5 text-xs font-semibold text-foreground">
          YT
        </span>
        <div className="flex items-center gap-1 rounded-lg border border-foreground/10 px-3 py-1.5">
          <span className="text-xs font-bold text-foreground">{asset.ytLeverage}</span>
          <InfoIcon className="size-3 text-foreground/30" />
          <span className="ml-1 text-[10px] text-foreground/40">{asset.ytPrice}</span>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-foreground/10 px-3 py-1.5">
          <span className="text-xs text-foreground">{asset.ytImplied}</span>
        </div>
      </div>

      <div className="col-span-3 flex items-center justify-end gap-2">
        <span className="rounded-full bg-foreground/5 px-3 py-1.5 text-xs font-semibold text-foreground">
          PT
        </span>
        <div className="flex items-center gap-2 rounded-lg border border-foreground/10 px-4 py-1.5">
          <span className="text-sm font-bold text-foreground">{asset.fixedApr}</span>
          <InfoIcon className="size-3 text-foreground/30" />
        </div>
        <span className="text-xs text-foreground/40">{asset.ptPrice}</span>
      </div>
    </div>
  )
}
