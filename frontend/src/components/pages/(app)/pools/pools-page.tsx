"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { InfoIcon } from "lucide-react"
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Liquidity Pools
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/60">
        Provide liquidity with SY and PT pairs to earn both pool trading fees
        and protocol points — with no impermanent loss at maturity.
      </p>

      <div className="mt-8 flex w-fit items-center gap-1 rounded-full border border-foreground/10 p-1">
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
          <div className="col-span-2">Points</div>
          <div className="col-span-2">Pool APR (7d)</div>
          <div className="col-span-3">
            Maturity <InfoIcon className="mb-0.5 ml-1 inline size-3" />
          </div>
          <div className="col-span-2 text-right">Liquidity</div>
        </div>

        <div className="mt-2 flex flex-col gap-3">
          {tab === "active" ? (
            pools.map((pool) => <PoolRow key={pool.slug} pool={pool} />)
          ) : (
            <p className="py-12 text-center text-sm text-foreground/40">
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
      className="grid cursor-pointer grid-cols-1 items-center gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-5 transition-colors hover:bg-foreground/[0.04] md:grid-cols-12"
    >
      <div className="col-span-3 flex items-center gap-3">
        <Image
          src={pool.logo}
          alt={pool.name}
          width={40}
          height={40}
          className="size-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">{pool.name}</p>
          <p className="text-xs text-foreground/40">{pool.subtitle}</p>
        </div>
      </div>

      <div className="col-span-2 text-sm text-foreground">
        {pool.points}
      </div>

      <div className="col-span-2 text-lg font-bold text-foreground">
        {pool.poolApr7d}
      </div>

      <div className="col-span-3">
        <p className="text-sm font-medium text-foreground">{pool.maturity}</p>
        <p className="text-xs text-foreground/40">{pool.daysLeft} days</p>
      </div>

      <div className="col-span-2 text-right text-sm font-medium text-foreground">
        {pool.liquidity}
      </div>
    </Link>
  )
}
