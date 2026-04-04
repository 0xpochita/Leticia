"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, InfoIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EarnDetail {
  name: string
  subtitle: string
  logo: string
  fixedApr: string
  gain: string
  maturity: string
  daysLeft: number
  priceImpact: string
}

const earnData: Record<string, EarnDetail> = {
  "init-usdc-lp": {
    name: "INIT-USDC LP",
    subtitle: "Enshrined Liquidity",
    logo: "/Assets/Images/Logo/init-logo.png",
    fixedApr: "12.4%",
    gain: "6.2%",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    priceImpact: "0.02%",
  },
  esinit: {
    name: "esINIT",
    subtitle: "VIP Rewards",
    logo: "/Assets/Images/Logo/init-logo.png",
    fixedApr: "7.2%",
    gain: "3.6%",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    priceImpact: "0.01%",
  },
  sinit: {
    name: "sINIT",
    subtitle: "Liquid Staking",
    logo: "/Assets/Images/Logo/inertia-logo.png",
    fixedApr: "15.1%",
    gain: "7.5%",
    maturity: "30 Sep 2026",
    daysLeft: 179,
    priceImpact: "0.03%",
  },
}

export function EarnDetailPage({ slug }: { slug: string }) {
  const [tab, setTab] = useState<"deposit" | "withdraw">("deposit")
  const asset = earnData[slug]

  if (!asset) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-foreground/40">Asset not found</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-3xl border border-foreground/10 p-8 md:p-10">
        <Link
          href="/market/earn"
          className="inline-flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
        </Link>

        <div className="mt-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Earn Fixed Yield
          </h1>
          <div className="flex items-center gap-3">
            <Image
              src={asset.logo}
              alt={asset.name}
              width={44}
              height={44}
              className="size-11 rounded-full"
            />
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">
                {asset.name}
              </p>
              <p className="text-xs text-foreground/40">{asset.subtitle}</p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-foreground/50">
          Lock in a fixed yield that you'll receive at maturity, with the
          flexibility to withdraw earlier at market rates if needed
        </p>

        <div className="mt-8 border-b border-foreground/10">
          <div className="flex gap-6">
            {(["deposit", "withdraw"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "cursor-pointer border-b-2 pb-3 text-sm font-medium capitalize transition-colors",
                  tab === t
                    ? "border-foreground text-foreground"
                    : "border-transparent text-foreground/40 hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5">
          <div className="flex justify-end">
            <span className="text-xs text-foreground/40">
              Max: 0 {asset.name}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-foreground/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <Image
                src={asset.logo}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full"
              />
              <span className="text-sm font-medium text-foreground">
                {asset.name}
              </span>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-foreground">0</p>
              <p className="text-xs text-foreground/40">$0</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-foreground/5 bg-foreground/[0.02] px-5 py-3">
            <span className="text-sm text-foreground/50">You could earn:</span>
            <span className="text-sm text-foreground">
              <span className="font-semibold">0 INIT</span>{" "}
              <span className="text-foreground/40">
                in {asset.name} (~$0)
              </span>
            </span>
          </div>

          <div className="rounded-2xl border border-foreground/10 px-5 py-4">
            <div>
              <p className="text-xs text-foreground/40">Pay</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  0 INIT
                </span>
                <span className="text-xs text-foreground/30">
                  (0 {asset.name})
                </span>
              </div>
            </div>
            <div className="my-3 flex items-center gap-2 text-xs text-foreground/30">
              <div className="h-6 w-px bg-foreground/10" />
              <span>0 days</span>
            </div>
            <div>
              <p className="text-xs text-foreground/40">Withdraw</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  0 INIT
                </span>
                <span className="text-xs text-foreground/30">
                  (0 PT {asset.name})
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                label: "Fixed APR in INIT",
                value: asset.fixedApr,
                info: true,
              },
              { label: "Gain", value: asset.gain },
              {
                label: "Maturity",
                value: `${asset.maturity} (${asset.daysLeft} days)`,
              },
              { label: "Price Impact", value: asset.priceImpact },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-1">
                  <span className="text-sm text-foreground/50">
                    {row.label}
                  </span>
                  {row.info && (
                    <InfoIcon className="size-3 text-foreground/30" />
                  )}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-2 w-full cursor-pointer rounded-xl border border-foreground/10 py-4 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            {tab === "deposit" ? "Deposit" : "Withdraw"}
          </button>
        </div>
      </div>
    </div>
  )
}
