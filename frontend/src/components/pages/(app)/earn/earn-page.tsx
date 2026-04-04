"use client"

import { useState } from "react"
import Image from "next/image"
import { SearchIcon, LockIcon } from "lucide-react"
import { FiChevronRight } from "react-icons/fi"

interface EarnAsset {
  name: string
  subtitle: string
  logo: string
  apr: string
  deposited: string
  maturity: string
  daysLeft: number
  badge?: "lock"
}

const assets: EarnAsset[] = [
  {
    name: "INIT",
    subtitle: "Initia Network",
    logo: "/Assets/Images/Logo/init-logo.webp",
    apr: "12%",
    deposited: "$124.5K",
    maturity: "30 Jun 2026",
    daysLeft: 87,
  },
  {
    name: "USDe",
    subtitle: "Ethena Stablecoin",
    logo: "/Assets/Images/Logo/susde-logo.webp",
    apr: "7%",
    deposited: "$68.2K",
    maturity: "30 Jun 2026",
    daysLeft: 87,
  },
  {
    name: "Inertia",
    subtitle: "Liquid Staking",
    logo: "/Assets/Images/Logo/inertia-logo.png",
    apr: "15%",
    deposited: "$215.8K",
    maturity: "30 Sep 2026",
    daysLeft: 179,
  },
]

export function EarnPage() {
  const [search, setSearch] = useState("")

  const filtered = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Simple Earn
      </h1>

      <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/50">
        Deposit your assets and earn a guaranteed fixed return. No trading
        needed — just pick an asset and start earning.
      </p>

      <div className="mt-8 rounded-2xl border border-foreground/10">
        <div className="flex items-center justify-between border-b border-foreground/5 px-5 py-3">
          <span className="text-xs text-foreground/40">
            {filtered.length} assets available
          </span>
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

        <div className="hidden items-center px-5 py-2.5 text-[11px] text-foreground/35 md:flex">
          <div className="w-[28%] shrink-0">Asset</div>
          <div className="w-[14%] shrink-0 text-right">Fixed APR</div>
          <div className="w-[18%] shrink-0 text-right">Total Deposited</div>
          <div className="w-[20%] shrink-0 text-right">Maturity</div>
          <div className="w-[20%] shrink-0" />
        </div>

        <div className="divide-y divide-foreground/5">
          {filtered.length > 0 ? (
            filtered.map((asset) => (
              <EarnRow key={asset.name} asset={asset} />
            ))
          ) : (
            <p className="py-12 text-center text-xs text-foreground/30">
              No results
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function EarnRow({ asset }: { asset: EarnAsset }) {
  return (
    <div className="flex flex-col items-center gap-4 px-5 py-4 transition-colors hover:bg-foreground/[0.02] md:flex-row md:gap-0">
      <div className="flex w-[28%] shrink-0 items-center gap-3">
        <div className="relative">
          <Image
            src={asset.logo}
            alt={asset.name}
            width={36}
            height={36}
            className="size-9 rounded-full"
          />
          {asset.badge === "lock" && (
            <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-foreground text-background">
              <LockIcon className="size-2.5" />
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{asset.name}</p>
          <p className="text-[11px] text-foreground/35">{asset.subtitle}</p>
        </div>
      </div>

      <div className="w-[14%] shrink-0 text-right">
        <span className="text-lg font-bold text-foreground">{asset.apr}</span>
      </div>

      <div className="w-[18%] shrink-0 text-right text-sm text-foreground/60">
        {asset.deposited}
      </div>

      <div className="w-[20%] shrink-0 text-right">
        <p className="text-sm text-foreground">{asset.maturity}</p>
        <p className="text-[11px] text-foreground/35">{asset.daysLeft} days left</p>
      </div>

      <div className="flex w-[20%] shrink-0 justify-end">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Deposit
          <FiChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
