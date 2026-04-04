"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { InfoIcon, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarketAsset {
  slug: string
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
  volume24h: string
}

const markets: MarketAsset[] = [
  {
    slug: "init-usdc-lp",
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
    volume24h: "$42,300",
  },
  {
    slug: "esinit",
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
    volume24h: "$18,900",
  },
  {
    slug: "sinit",
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
    volume24h: "$67,500",
  },
]

export function MarketPage() {
  const [tab, setTab] = useState<"active" | "inactive">("active")
  const [search, setSearch] = useState("")

  const filtered = markets.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Market
      </h1>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/50">
        Fix your yield with <strong className="text-foreground">PT tokens</strong> or go
        long on yield with leveraged{" "}
        <strong className="text-foreground">YT tokens (high risk)</strong>.
        Choose a protocol and take control of your earnings.
      </p>

      <div className="mt-8 rounded-2xl border border-foreground/10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/5 px-5 py-3">
          <div className="flex items-center gap-1 rounded-full border border-foreground/10 p-0.5">
            <button
              type="button"
              onClick={() => setTab("active")}
              className={cn(
                "cursor-pointer rounded-full px-4 py-1 text-xs font-medium transition-colors",
                tab === "active"
                  ? "bg-foreground text-background"
                  : "text-foreground/40 hover:text-foreground",
              )}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setTab("inactive")}
              className={cn(
                "cursor-pointer rounded-full px-4 py-1 text-xs font-medium transition-colors",
                tab === "inactive"
                  ? "bg-foreground text-background"
                  : "text-foreground/40 hover:text-foreground",
              )}
            >
              Inactive
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-foreground/10 px-3 py-1.5">
            <SearchIcon className="size-3.5 text-foreground/30" />
            <input
              type="text"
              placeholder="Search markets"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-32 bg-transparent text-xs text-foreground outline-none placeholder:text-foreground/30"
            />
          </div>
        </div>

        <div className="hidden items-center px-5 py-2.5 text-[11px] text-foreground/35 md:flex md:gap-0">
          <div className="w-[16%] shrink-0">Asset</div>
          <div className="w-[9%] shrink-0">Maturity</div>
          <div className="w-[8%] shrink-0 text-right">Liquidity</div>
          <div className="w-[8%] shrink-0 text-right">Volume 24h</div>
          <div className="flex grow items-center justify-end gap-4">
            <div className="w-[190px] shrink-0 text-center">
              Long Yield with Leverage <InfoIcon className="mb-0.5 ml-0.5 inline size-2.5" />
            </div>
            <div className="w-[190px] shrink-0 text-center">
              Fixed APR <InfoIcon className="mb-0.5 ml-0.5 inline size-2.5" />
            </div>
          </div>
        </div>

        <div className="divide-y divide-foreground/5">
          {tab === "active" ? (
            filtered.length > 0 ? (
              filtered.map((asset) => (
                <MarketRow key={asset.name} asset={asset} />
              ))
            ) : (
              <p className="py-12 text-center text-xs text-foreground/30">
                No results
              </p>
            )
          ) : (
            <p className="py-12 text-center text-xs text-foreground/30">
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
    <Link href={`/market/${asset.slug}`} className="flex flex-col items-center gap-4 px-5 py-3.5 transition-colors hover:bg-foreground/[0.02] md:flex-row md:gap-0">
      <div className="flex w-[16%] shrink-0 items-center gap-3">
        <Image
          src={asset.logo}
          alt={asset.name}
          width={32}
          height={32}
          className="size-8 rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-foreground">{asset.name}</p>
          <p className="text-[11px] text-foreground/35">{asset.subtitle}</p>
        </div>
      </div>

      <div className="w-[9%] shrink-0">
        <p className="text-sm text-foreground">{asset.maturity}</p>
        <p className="text-[11px] text-foreground/35">{asset.daysLeft} days</p>
      </div>

      <div className="w-[8%] shrink-0 text-right text-sm text-foreground/60">
        {asset.liquidity}
      </div>

      <div className="w-[8%] shrink-0 text-right text-sm text-foreground/60">
        {asset.volume24h}
      </div>

      <div className="flex grow items-center justify-end gap-4">
        <div className="flex w-[190px] shrink-0 items-center justify-center">
          <div className="flex items-stretch overflow-hidden rounded-xl border border-foreground/10">
            <div className="flex items-center justify-center bg-foreground/5 px-3.5 py-2">
              <span className="text-xs font-semibold text-foreground">YT</span>
            </div>
            <div className="flex items-center gap-2 border-l border-foreground/10 px-3 py-2">
              <span className="text-xs font-bold text-foreground">{asset.ytLeverage}</span>
              <InfoIcon className="size-2.5 text-foreground/25" />
            </div>
            <div className="flex flex-col items-center justify-center border-l border-foreground/10 px-3 py-1.5">
              <span className="text-[10px] text-foreground/40">{asset.ytPrice}</span>
              <span className="text-[10px] font-medium text-foreground/50">{asset.ytImplied}</span>
            </div>
          </div>
        </div>

        <div className="flex w-[190px] shrink-0 items-center justify-center">
          <div className="flex items-stretch overflow-hidden rounded-xl border border-foreground/10">
            <div className="flex items-center justify-center bg-foreground/5 px-3.5 py-2">
              <span className="text-xs font-semibold text-foreground">PT</span>
            </div>
            <div className="flex items-center gap-1.5 border-l border-foreground/10 px-3 py-2">
              <span className="text-xs font-bold text-foreground">{asset.fixedApr}</span>
              <InfoIcon className="size-2.5 text-foreground/25" />
            </div>
            <div className="flex items-center border-l border-foreground/10 px-3 py-2">
              <span className="text-[10px] text-foreground/40">{asset.ptPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
