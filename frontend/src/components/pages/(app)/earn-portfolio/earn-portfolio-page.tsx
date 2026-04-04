"use client"

import { useState } from "react"
import Image from "next/image"
import { InfoIcon, TrendingUpIcon } from "lucide-react"

export function EarnPortfolioPage() {
  const [hideSmall, setHideSmall] = useState(false)

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Portfolio
      </h1>

      <div className="mt-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground/40">Total Deposited</span>
          <InfoIcon className="size-3 text-foreground/30" />
        </div>
        <p className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          $0.00
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <div>
          <span className="text-xs text-foreground/40">Total Earned</span>
          <p className="mt-1 text-xl font-bold text-foreground">$0.00</p>
        </div>
        <div className="h-8 w-px bg-foreground/10" />
        <div>
          <span className="text-xs text-foreground/40">Claimable</span>
          <p className="mt-1 text-xl font-bold text-foreground">$0.00</p>
        </div>
        <div className="h-8 w-px bg-foreground/10" />
        <div>
          <span className="text-xs text-foreground/40">Avg APR</span>
          <p className="mt-1 text-xl font-bold text-foreground">0%</p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-foreground/10 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">
            Active Deposits
          </p>
          <span className="text-xs text-foreground/40">0 positions</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-foreground/5 pt-3">
          <span className="text-xs text-foreground/40">
            Currently no active deposits
          </span>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">My Assets</h2>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={hideSmall}
              onChange={(e) => setHideSmall(e.target.checked)}
              className="size-4 cursor-pointer rounded border-foreground/20 accent-foreground"
            />
            <span className="text-xs text-foreground/40">Hide small</span>
          </label>
        </div>

        <div className="mt-4">
          <div className="hidden items-center border-b border-foreground/10 pb-3 text-xs text-foreground/40 md:grid md:grid-cols-10 md:gap-4 md:px-4">
            <div className="col-span-3">Asset</div>
            <div className="col-span-2">Deposited</div>
            <div className="col-span-2">Earned</div>
            <div className="col-span-2">APR</div>
            <div className="col-span-1 text-right">Status</div>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            {[
              {
                name: "INIT-USDC LP",
                subtitle: "Enshrined Liquidity",
                logo: "/Assets/Images/Logo/init-logo.png",
                deposited: "$0.00",
                earned: "$0.00",
                apr: "12%",
              },
              {
                name: "esINIT",
                subtitle: "VIP Rewards",
                logo: "/Assets/Images/Logo/init-logo.png",
                deposited: "$0.00",
                earned: "$0.00",
                apr: "7%",
              },
              {
                name: "sINIT",
                subtitle: "Liquid Staking",
                logo: "/Assets/Images/Logo/inertia-logo.png",
                deposited: "$0.00",
                earned: "$0.00",
                apr: "15%",
              },
            ].map((asset) => (
              <div
                key={asset.name}
                className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-foreground/10 px-4 py-4 md:grid-cols-10"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <Image
                    src={asset.logo}
                    alt={asset.name}
                    width={36}
                    height={36}
                    className="size-9 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {asset.name}
                    </p>
                    <p className="text-xs text-foreground/40">
                      {asset.subtitle}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-foreground">
                  {asset.deposited}
                </div>
                <div className="col-span-2 text-sm text-foreground">
                  {asset.earned}
                </div>
                <div className="col-span-2 text-sm font-semibold text-foreground">
                  {asset.apr}
                </div>
                <div className="col-span-1 text-right">
                  <span className="rounded-full bg-foreground/5 px-3 py-1 text-[10px] text-foreground/40">
                    Idle
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
