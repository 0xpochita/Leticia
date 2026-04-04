"use client"

import { useState } from "react"
import Image from "next/image"
import { InfoIcon, ChevronDownIcon, TrendingUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const timeTabs = ["1D", "1W", "1M", "ALL"] as const
type TimeTab = (typeof timeTabs)[number]

export function DashboardPage() {
  const [timeTab, setTimeTab] = useState<TimeTab>("1D")
  const [hideSmall, setHideSmall] = useState(false)

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg text-foreground/50">Total Portfolio Value</h2>
          <InfoIcon className="size-4 text-foreground/30" />
        </div>
        <p className="mt-2 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          $0.00
        </p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="text-sm text-foreground/40">0 INIT</span>
          <Image
            src="/Assets/Images/Logo/init-logo.png"
            alt="INIT"
            width={16}
            height={16}
            className="size-4 rounded-full"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-foreground/40">P&amp;L</span>
            <InfoIcon className="size-3 text-foreground/30" />
          </div>
          <p className="mt-1 text-xl font-bold text-foreground">$0.00</p>
        </div>
        <div className="h-8 w-px bg-foreground/10" />
        <div>
          <span className="text-xs text-foreground/40">Claimable Yield</span>
          <p className="mt-1 text-xl font-bold text-foreground">$0.00</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-1">
        {timeTabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTimeTab(t)}
            className={cn(
              "cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
              timeTab === t
                ? "bg-foreground text-background"
                : "text-foreground/40 hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-foreground/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Portfolio Performance
            </h3>
            <p className="text-xs text-foreground/40">
              Showing portfolio value over time
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-foreground/10 px-3 py-1.5 text-xs text-foreground/50">
            30 days
            <ChevronDownIcon className="size-3" />
          </div>
        </div>

        <div className="relative mt-6 h-48">
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-end">
            <svg viewBox="0 0 400 120" className="h-32 w-1/3 text-foreground/10">
              <path
                d="M0,120 C50,118 100,115 150,100 C200,85 250,40 300,20 C350,0 380,10 400,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M0,120 C50,118 100,115 150,100 C200,85 250,40 300,20 C350,0 380,10 400,5 L400,120 Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-foreground/10" />
        </div>

        <div className="mt-3 flex justify-between text-[10px] text-foreground/30">
          {["Sep 16", "Sep 20", "Sep 24", "Sep 28", "Oct 2", "Oct 6", "Oct 10", "Oct 14"].map(
            (d) => (
              <span key={d}>{d}</span>
            ),
          )}
        </div>
      </div>

      <div className="mt-6 max-w-md rounded-2xl border border-foreground/10 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Active Positions
            </p>
            <p className="text-xs text-foreground/40">
              Currently no active positions
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">0 INIT</p>
            <p className="text-xs text-foreground/40">= $0.00</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-foreground/5 pt-3">
          <span className="text-xs text-foreground/40">APY</span>
          <span className="text-xs text-foreground/40">--</span>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground">Balances</h2>

        <label className="mt-4 flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={hideSmall}
            onChange={(e) => setHideSmall(e.target.checked)}
            className="size-4 cursor-pointer rounded border-foreground/20 accent-foreground"
          />
          <span className="text-sm text-foreground/50">
            Hide small balances
          </span>
        </label>

        <div className="mt-6">
          <div className="hidden items-center border-b border-foreground/10 pb-3 text-xs text-foreground/40 md:grid md:grid-cols-12 md:gap-4 md:px-4">
            <div className="col-span-2">Asset</div>
            <div className="col-span-2">Balance</div>
            <div className="col-span-2">Today's Return</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">24h Volume</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            {[
              {
                name: "INIT",
                subtitle: "Initia",
                logo: "/Assets/Images/Logo/init-logo.png",
                balance: "0 INIT",
                balanceUsd: "$0.00",
                returnPct: "+0.00%",
                price: "$0.00",
                volume: "$0",
              },
              {
                name: "sINIT",
                subtitle: "Inertia",
                logo: "/Assets/Images/Logo/inertia-logo.png",
                balance: "0 sINIT",
                balanceUsd: "$0.00",
                returnPct: "+0.00%",
                price: "$0.00",
                volume: "$0",
              },
            ].map((asset) => (
              <div
                key={asset.name}
                className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-foreground/10 px-4 py-4 md:grid-cols-12"
              >
                <div className="col-span-2 flex items-center gap-3">
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

                <div className="col-span-2">
                  <p className="text-sm font-medium text-foreground">
                    {asset.balance}
                  </p>
                  <p className="text-xs text-foreground/40">
                    {asset.balanceUsd}
                  </p>
                </div>

                <div className="col-span-2 flex items-center gap-1">
                  <TrendingUpIcon className="size-3.5 text-foreground/30" />
                  <span className="text-sm text-foreground/50">
                    {asset.returnPct}
                  </span>
                </div>

                <div className="col-span-2 text-sm text-foreground">
                  {asset.price}
                </div>

                <div className="col-span-2 text-sm text-foreground">
                  {asset.volume}
                </div>

                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    className="cursor-pointer rounded-lg border border-foreground/10 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer rounded-lg border border-foreground/10 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
                  >
                    Receive
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-foreground/30">
            Additional assets will appear here when available
          </p>
        </div>
      </div>
    </div>
  )
}
