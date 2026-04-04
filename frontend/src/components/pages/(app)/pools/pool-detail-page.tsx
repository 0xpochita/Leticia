"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, InfoIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PoolDetail {
  name: string
  subtitle: string
  logo: string
  maturity: string
  daysLeft: number
  liquidity: string
  poolApr7d: string
  tradingFeesApr7d: string
  poolApr30d: string
  tradingFeesApr30d: string
  underlyingYield: string
  ptYield: string
  tradingFeesYield30d: string
  description: string
}

const poolData: Record<string, PoolDetail> = {
  "init-usdc-lp": {
    name: "INIT-USDC LP",
    subtitle: "Enshrined Liquidity",
    logo: "/Assets/Images/Logo/init-logo.png",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    liquidity: "$124,500",
    poolApr7d: "5.52%",
    tradingFeesApr7d: "0.12%",
    poolApr30d: "7.37%",
    tradingFeesApr30d: "0.043%",
    underlyingYield: "1.25%",
    ptYield: "4.32%",
    tradingFeesYield30d: "0.043%",
    description:
      "INIT-USDC LP is the Enshrined Liquidity pool from Initia, where liquidity providers earn INIT rewards and trading fees. When deposited into Leticia, the LP token is wrapped into SY, then split into PT and YT. PT holders receive fixed yield at maturity, while YT holders earn the variable yield stream. LPs in the Leticia pool earn trading fees from PT/YT swaps plus protocol rewards.",
  },
  esinit: {
    name: "esINIT",
    subtitle: "VIP Rewards",
    logo: "/Assets/Images/Logo/init-logo.png",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    liquidity: "$68,200",
    poolApr7d: "1.35%",
    tradingFeesApr7d: "0.08%",
    poolApr30d: "2.10%",
    tradingFeesApr30d: "0.031%",
    underlyingYield: "0.85%",
    ptYield: "1.20%",
    tradingFeesYield30d: "0.031%",
    description:
      "esINIT (escrowed INIT) is the VIP reward token from Initia's reward distribution program. It vests over time into INIT. When deposited into Leticia, esINIT is wrapped and tokenized, allowing users to trade the future yield from vesting rewards. This enables instant liquidity for locked VIP rewards.",
  },
  sinit: {
    name: "sINIT",
    subtitle: "Liquid Staking",
    logo: "/Assets/Images/Logo/inertia-logo.png",
    maturity: "30 Sep 2026",
    daysLeft: 179,
    liquidity: "$215,800",
    poolApr7d: "3.02%",
    tradingFeesApr7d: "0.15%",
    poolApr30d: "4.85%",
    tradingFeesApr30d: "0.062%",
    underlyingYield: "2.10%",
    ptYield: "3.50%",
    tradingFeesYield30d: "0.062%",
    description:
      "sINIT is the liquid staking token from Inertia, representing staked INIT. Holders earn staking rewards while maintaining liquidity. When deposited into Leticia, sINIT yield is tokenized into PT (fixed rate) and YT (variable rate), enabling advanced yield strategies on top of staking returns.",
  },
}

export function PoolDetailPage({ slug }: { slug: string }) {
  const [tab, setTab] = useState<"mint" | "manual">("mint")
  const pool = poolData[slug]

  if (!pool) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12 text-center">
        <p className="text-foreground/50">Pool not found</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link
        href="/market/pools"
        className="inline-flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to Pools
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 px-5 py-4">
                <Image
                  src={pool.logo}
                  alt={pool.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {pool.name}
                  </p>
                  <p className="text-xs text-foreground/40">{pool.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 px-5 py-4">
                <span className="text-sm font-medium text-foreground">
                  {pool.maturity}
                </span>
                <span className="text-xs text-foreground/40">
                  {pool.daysLeft} days
                </span>
                <ChevronDownIcon className="size-4 text-foreground/30" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 md:grid-cols-5">
              {[
                { label: "Liquidity", value: pool.liquidity },
                { label: "Pool APR (7d)", value: pool.poolApr7d },
                { label: "Trading fees APR (7d)", value: pool.tradingFeesApr7d },
                { label: "Pool APR (30d)", value: pool.poolApr30d },
                { label: "Trading fees APR (30d)", value: pool.tradingFeesApr30d },
              ].map((item) => (
                <div key={item.label} className="bg-background px-4 py-4">
                  <p className="text-[10px] text-foreground/40">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-foreground/10 p-6">
              <div className="flex items-start gap-3">
                <Image
                  src={pool.logo}
                  alt=""
                  width={32}
                  height={32}
                  className="mt-0.5 size-8 rounded-full"
                />
                <p className="text-sm leading-relaxed text-foreground/60">
                  {pool.description}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/10 p-6">
              <div className="flex flex-col items-center gap-6 py-4">
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-foreground/20 px-5 py-3">
                  <Image src={pool.logo} alt="" width={24} height={24} className="size-6 rounded-full" />
                  <span className="text-sm text-foreground">{pool.name}</span>
                </div>

                <div className="text-xs text-foreground/40">Mint 58%</div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-xl border border-dashed border-foreground/20 px-4 py-3">
                    <Image src={pool.logo} alt="" width={20} height={20} className="size-5 rounded-full" />
                    <span className="text-xs text-foreground">PT {pool.name}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-dashed border-foreground/20 px-4 py-3">
                    <Image src={pool.logo} alt="" width={20} height={20} className="size-5 rounded-full" />
                    <span className="text-xs text-foreground">YT {pool.name}</span>
                  </div>
                </div>

                <div className="text-xs text-foreground/40">Provide 42%</div>

                <div className="flex items-center gap-2 rounded-xl border border-dashed border-foreground/20 px-4 py-3">
                  <span className="text-xs text-foreground">LP {pool.name}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/10 p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                My APR
              </h3>
              <div className="divide-y divide-foreground/5">
                {[
                  { label: "Underlying Yield", value: pool.underlyingYield },
                  { label: "PT Yield", value: pool.ptYield },
                  { label: "Trading fees Yield (30d)", value: pool.tradingFeesYield30d },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      {item.label}
                      <InfoIcon className="size-3 text-foreground/30" />
                      <ChevronDownIcon className="size-3 text-foreground/30" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-2 py-3 text-sm text-foreground/60">
                  Rewards
                  <ChevronDownIcon className="size-3 text-foreground/30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-foreground/10 p-6">
            <div className="mb-6 flex items-center gap-1 rounded-full border border-foreground/10 p-1">
              <button
                type="button"
                onClick={() => setTab("mint")}
                className={cn(
                  "flex-1 cursor-pointer rounded-full py-2 text-center text-sm font-medium transition-colors",
                  tab === "mint"
                    ? "bg-foreground text-background"
                    : "text-foreground/50 hover:text-foreground",
                )}
              >
                Add liquidity
              </button>
              <button
                type="button"
                onClick={() => setTab("manual")}
                className={cn(
                  "flex-1 cursor-pointer rounded-full py-2 text-center text-sm font-medium transition-colors",
                  tab === "manual"
                    ? "bg-foreground text-background"
                    : "text-foreground/50 hover:text-foreground",
                )}
              >
                Remove liquidity
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Provide
                </span>
                <span className="text-xs text-foreground/40">
                  Max: 0 {pool.name}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-foreground/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Image src={pool.logo} alt="" width={24} height={24} className="size-6 rounded-full" />
                  <span className="text-sm text-foreground">{pool.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">0</p>
                  <p className="text-xs text-foreground/40">$0</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-foreground/40">
                <span className="size-2 rounded-full bg-foreground" />
                Step 1: Mint PT &amp; YT
              </div>

              <div className="flex items-center justify-between rounded-xl border border-foreground/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Image src={pool.logo} alt="" width={24} height={24} className="size-6 rounded-full" />
                  <span className="text-sm text-foreground">PT {pool.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">0</p>
                  <p className="text-xs text-foreground/40">$0</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-foreground/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Image src={pool.logo} alt="" width={24} height={24} className="size-6 rounded-full" />
                  <span className="text-sm text-foreground">YT {pool.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">0</p>
                  <p className="text-xs text-foreground/40">$0</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-foreground/40">
                <span className="size-2 rounded-full bg-foreground" />
                Step 2: Provide Liquidity
              </div>

              <div className="flex items-center justify-between rounded-xl border border-foreground/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">LP {pool.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">0</p>
                  <p className="text-xs text-foreground/40">$0</p>
                </div>
              </div>

              <button
                type="button"
                className="mt-2 w-full cursor-pointer rounded-xl border border-foreground/10 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                Add Liquidity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
