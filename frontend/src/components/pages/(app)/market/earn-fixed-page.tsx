"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { InfoIcon, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EarnAsset {
  slug: string
  name: string
  subtitle: string
  logo: string
  fixedApr: string
  aprToken: string
  aprTokenLogo: string
  maturity: string
  daysLeft: number
  liquidity: string
}

const assets: EarnAsset[] = [
  {
    slug: "init-usdc-lp",
    name: "INIT-USDC LP",
    subtitle: "Enshrined Liquidity",
    logo: "/Assets/Images/Logo/init-logo.png",
    fixedApr: "12.4%",
    aprToken: "INIT",
    aprTokenLogo: "/Assets/Images/Logo/init-logo.webp",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    liquidity: "$124,500",
  },
  {
    slug: "esinit",
    name: "esINIT",
    subtitle: "VIP Rewards",
    logo: "/Assets/Images/Logo/init-logo.png",
    fixedApr: "7.2%",
    aprToken: "INIT",
    aprTokenLogo: "/Assets/Images/Logo/init-logo.webp",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    liquidity: "$68,200",
  },
  {
    slug: "sinit",
    name: "sINIT",
    subtitle: "Liquid Staking",
    logo: "/Assets/Images/Logo/inertia-logo.png",
    fixedApr: "15.1%",
    aprToken: "INIT",
    aprTokenLogo: "/Assets/Images/Logo/init-logo.webp",
    maturity: "30 Sep 2026",
    daysLeft: 179,
    liquidity: "$215,800",
  },
]

export function EarnFixedPage() {
  const [tab, setTab] = useState<"active" | "inactive">("active")
  const [search, setSearch] = useState("")

  const filtered = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Earn Fixed Yield
        </h1>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/50">
        Lock in a fixed yield that you'll receive at maturity, with the
        flexibility to withdraw earlier at market rates if needed
      </p>

      <div className="mt-8 rounded-2xl border border-foreground/10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/5 px-5 py-3">
          <div className="flex items-center gap-3">
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
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-foreground/10 px-3 py-1.5">
            <SearchIcon className="size-3.5 text-foreground/30" />
            <input
              type="text"
              placeholder="Search assets"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-32 bg-transparent text-xs text-foreground outline-none placeholder:text-foreground/30"
            />
          </div>
        </div>

        <div className="hidden items-center px-5 py-2.5 text-[11px] text-foreground/35 md:grid md:grid-cols-12 md:gap-4">
          <div className="col-span-3">Asset</div>
          <div className="col-span-2">
            Fixed APR <InfoIcon className="mb-0.5 ml-0.5 inline size-2.5" />
          </div>
          <div className="col-span-2">APR shown in</div>
          <div className="col-span-2">
            Maturity <InfoIcon className="mb-0.5 ml-0.5 inline size-2.5" />
          </div>
          <div className="col-span-1 text-right">Liquidity</div>
          <div className="col-span-2" />
        </div>

        <div className="divide-y divide-foreground/5">
          {tab === "active" ? (
            filtered.length > 0 ? (
              filtered.map((asset) => (
                <EarnRow key={asset.slug} asset={asset} />
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

function EarnRow({ asset }: { asset: EarnAsset }) {
  return (
    <Link
      href={`/market/earn/${asset.slug}`}
      className="grid cursor-pointer grid-cols-1 items-center gap-4 px-5 py-3.5 transition-colors hover:bg-foreground/[0.02] md:grid-cols-12"
    >
      <div className="col-span-3 flex items-center gap-3">
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

      <div className="col-span-2">
        <span className="text-sm font-semibold text-foreground">
          {asset.fixedApr}
        </span>
      </div>

      <div className="col-span-2 flex items-center gap-2">
        <Image
          src={asset.aprTokenLogo}
          alt={asset.aprToken}
          width={20}
          height={20}
          className="size-5 rounded-full"
        />
        <span className="text-sm text-foreground/60">{asset.aprToken}</span>
      </div>

      <div className="col-span-2">
        <p className="text-sm text-foreground">{asset.maturity}</p>
        <p className="text-[11px] text-foreground/35">{asset.daysLeft} days</p>
      </div>

      <div className="col-span-1 text-right text-sm text-foreground/60">
        {asset.liquidity}
      </div>

      <div className="col-span-2 flex justify-end">
        <span className="whitespace-nowrap rounded-full bg-foreground/5 px-4 py-2 text-[11px] text-foreground/60 transition-colors hover:bg-foreground hover:text-background">
          Earn
        </span>
      </div>
    </Link>
  )
}
