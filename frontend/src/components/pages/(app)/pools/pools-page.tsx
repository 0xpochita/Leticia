"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { InfoIcon, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Pool {
  slug: string
  name: string
  subtitle: string
  logo: string
  points: string
  poolApr7d: string
  maturity: string
  daysLeft: number
  liquidity: string
}

const pools: Pool[] = [
  {
    slug: "init-usdc-lp",
    name: "INIT-USDC LP",
    subtitle: "Enshrined Liquidity",
    logo: "/Assets/Images/Logo/init-logo.png",
    points: "8.24",
    poolApr7d: "5.52%",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    liquidity: "$124,500",
  },
  {
    slug: "esinit",
    name: "esINIT",
    subtitle: "VIP Rewards",
    logo: "/Assets/Images/Logo/init-logo.png",
    points: "6.05",
    poolApr7d: "1.35%",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    liquidity: "$68,200",
  },
  {
    slug: "sinit",
    name: "sINIT",
    subtitle: "Liquid Staking",
    logo: "/Assets/Images/Logo/inertia-logo.png",
    points: "9.48",
    poolApr7d: "3.02%",
    maturity: "30 Sep 2026",
    daysLeft: 179,
    liquidity: "$215,800",
  },
]

export function PoolsPage() {
  const [tab, setTab] = useState<"active" | "inactive">("active")
  const [search, setSearch] = useState("")

  const filtered = pools.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Liquidity Pools
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/50">
        Provide liquidity with SY and PT pairs to earn both pool trading fees
        and protocol points — with no impermanent loss at maturity.
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
              placeholder="Search pools"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-32 bg-transparent text-xs text-foreground outline-none placeholder:text-foreground/30"
            />
          </div>
        </div>

        <div className="hidden items-center px-5 py-2.5 text-[11px] text-foreground/35 md:grid md:grid-cols-12 md:gap-4">
          <div className="col-span-3">Asset</div>
          <div className="col-span-1">Points</div>
          <div className="col-span-2">Pool APR (7d)</div>
          <div className="col-span-2">
            Maturity <InfoIcon className="mb-0.5 ml-0.5 inline size-2.5" />
          </div>
          <div className="col-span-2 text-right">Liquidity</div>
          <div className="col-span-2" />
        </div>

        <div className="divide-y divide-foreground/5">
          {tab === "active" ? (
            filtered.length > 0 ? (
              filtered.map((pool) => (
                <PoolRow key={pool.slug} pool={pool} />
              ))
            ) : (
              <p className="py-12 text-center text-xs text-foreground/30">
                No results
              </p>
            )
          ) : (
            <p className="py-12 text-center text-xs text-foreground/30">
              No inactive pools
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function PoolRow({ pool }: { pool: Pool }) {
  return (
    <Link
      href={`/market/pools/${pool.slug}`}
      className="grid cursor-pointer grid-cols-1 items-center gap-4 px-5 py-3.5 transition-colors hover:bg-foreground/[0.02] md:grid-cols-12"
    >
      <div className="col-span-3 flex items-center gap-3">
        <Image
          src={pool.logo}
          alt={pool.name}
          width={32}
          height={32}
          className="size-8 rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-foreground">{pool.name}</p>
          <p className="text-[11px] text-foreground/35">{pool.subtitle}</p>
        </div>
      </div>

      <div className="col-span-1 text-sm text-foreground/60">
        {pool.points}
      </div>

      <div className="col-span-2 text-sm font-semibold text-foreground">
        {pool.poolApr7d}
      </div>

      <div className="col-span-2">
        <p className="text-sm text-foreground">{pool.maturity}</p>
        <p className="text-[11px] text-foreground/35">{pool.daysLeft} days</p>
      </div>

      <div className="col-span-2 text-right text-sm text-foreground/60">
        {pool.liquidity}
      </div>

      <div className="col-span-2 flex justify-end">
        <span className="whitespace-nowrap rounded-full bg-foreground/5 px-4 py-2 text-[11px] text-foreground/60 transition-colors hover:bg-foreground hover:text-background">
          Provide Liquidity
        </span>
      </div>
    </Link>
  )
}
