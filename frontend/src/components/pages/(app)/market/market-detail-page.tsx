"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, ArrowDownIcon, PlusIcon, InfoIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarketDetail {
  name: string
  subtitle: string
  logo: string
  maturity: string
  daysLeft: number
  liquidity: string
  volume24h: string
  underlyingApr: string
  fixedApr: string
  leverage: string
  ptDescription: string
  ytDescription: string
}

const marketData: Record<string, MarketDetail> = {
  "init-usdc-lp": {
    name: "INIT-USDC LP",
    subtitle: "Enshrined Liquidity",
    logo: "/Assets/Images/Logo/init-logo.png",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    liquidity: "$124,500",
    volume24h: "$42,300",
    underlyingApr: "3.50%",
    fixedApr: "12.4%",
    leverage: "x42",
    ptDescription: "When you buy a PT token, you fix your APR until maturity. After maturity, you can redeem your tokens along with the yield. Your return comes from buying PT tokens at a discount compared to their full value at maturity.",
    ytDescription: "When you buy YT tokens, you buy yield from the underlying asset. At maturity you can claim the accumulated yield in your Dashboard. YT tokens gradually decrease in value, reaching zero at maturity.",
  },
  esinit: {
    name: "esINIT",
    subtitle: "VIP Rewards",
    logo: "/Assets/Images/Logo/init-logo.png",
    maturity: "30 Jun 2026",
    daysLeft: 87,
    liquidity: "$68,200",
    volume24h: "$18,900",
    underlyingApr: "2.10%",
    fixedApr: "7.2%",
    leverage: "x28",
    ptDescription: "When you buy a PT token, you fix your APR until maturity. After maturity, you can redeem your tokens along with the yield.",
    ytDescription: "When you buy YT tokens, you buy yield from esINIT vesting rewards. At maturity you can claim the accumulated yield.",
  },
  sinit: {
    name: "sINIT",
    subtitle: "Liquid Staking",
    logo: "/Assets/Images/Logo/inertia-logo.png",
    maturity: "30 Sep 2026",
    daysLeft: 179,
    liquidity: "$215,800",
    volume24h: "$67,500",
    underlyingApr: "4.20%",
    fixedApr: "15.1%",
    leverage: "x65",
    ptDescription: "When you buy a PT token, you fix your APR until maturity. After maturity, you can redeem your tokens along with the yield.",
    ytDescription: "When you buy YT tokens, you buy staking yield from sINIT. Use leverage to amplify your yield exposure.",
  },
}

type TokenTab = "PT" | "YT"
type ActionTab = "swap" | "mint"
type SwapDir = "buy" | "sell"
type MintDir = "mint" | "redeem"
type InfoTab = "manual" | "info"
type HistoryTab = "history" | "positions"

export function MarketDetailPage({ slug }: { slug: string }) {
  const [tokenTab, setTokenTab] = useState<TokenTab>("PT")
  const [actionTab, setActionTab] = useState<ActionTab>("swap")
  const [swapDir, setSwapDir] = useState<SwapDir>("buy")
  const [mintDir, setMintDir] = useState<MintDir>("mint")
  const [infoTab, setInfoTab] = useState<InfoTab>("manual")
  const [historyTab, setHistoryTab] = useState<HistoryTab>("history")

  const market = marketData[slug]
  if (!market) {
    return <div className="flex min-h-[60vh] items-center justify-center text-foreground/40">Market not found</div>
  }

  const isPT = tokenTab === "PT"

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link href="/market" className="inline-flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 px-5 py-4">
              <Image src={market.logo} alt={market.name} width={36} height={36} className="size-9 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-foreground">{market.name}</p>
                <p className="text-xs text-foreground/40">{market.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 px-5 py-4">
              <span className="text-sm font-medium text-foreground">{market.maturity}</span>
              <span className="text-xs text-foreground/40">{market.daysLeft} days</span>
              <ChevronDownIcon className="size-4 text-foreground/30" />
            </div>
          </div>

          <div className="mt-6 border-b border-foreground/10">
            <div className="flex gap-6">
              {(["manual", "info"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setInfoTab(t)} className={cn("cursor-pointer border-b-2 pb-3 text-sm font-medium capitalize transition-colors", infoTab === t ? "border-foreground text-foreground" : "border-transparent text-foreground/40 hover:text-foreground")}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-foreground/10 p-6">
            <p className="text-sm leading-relaxed text-foreground/60">
              {isPT ? market.ptDescription : market.ytDescription}
            </p>
            {isPT && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-foreground">Early Redemption:</p>
                <p className="mt-1 text-sm text-foreground/60">
                  Your fixed yield is shown in terms of the base token. If you need to exit before maturity, you can redeem at the current market rate, but this might give you higher or lower returns than your initial locked rate.
                </p>
              </div>
            )}
            {!isPT && (
              <>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-foreground">What is leverage?</p>
                  <p className="mt-1 text-sm text-foreground/60">
                    The leverage number shows how much yield exposure you get compared to direct staking. For example, {market.leverage} leverage means $1,000 in YT gives you the yield from ${(Number.parseInt(market.leverage.replace("x", "")) * 1000).toLocaleString()} staked.
                  </p>
                </div>
                <div className="mt-4 rounded-xl border-l-2 border-foreground/20 bg-foreground/[0.03] px-4 py-3">
                  <p className="text-xs italic text-foreground/50">
                    <strong>Note:</strong> YT tokens are high-risk due to leverage and future yield uncertainty. Consider your risk tolerance before investing.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 md:grid-cols-4">
            {[
              { label: "Liquidity", value: market.liquidity },
              { label: "24H Volume", value: market.volume24h },
              { label: "Underlying APR", value: market.underlyingApr },
              { label: "Fixed APR", value: market.fixedApr },
            ].map((s) => (
              <div key={s.label} className="bg-background px-4 py-4">
                <p className="text-[10px] text-foreground/40">{s.label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-foreground/10 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Chart</h3>
              <div className="flex items-center gap-1 rounded-lg border border-foreground/10 p-0.5 text-[10px]">
                <span className="rounded px-2 py-1 text-foreground/40">1H</span>
                <span className="rounded bg-foreground px-2 py-1 text-background">1D</span>
              </div>
            </div>
            <div className="mt-4 flex h-48 items-end justify-center">
              <svg viewBox="0 0 400 120" className="h-full w-full text-foreground/15">
                <path d="M0,100 C50,95 100,80 150,85 C200,90 250,40 300,30 C350,20 380,25 400,20" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M0,90 C50,88 100,85 200,70 C250,60 300,50 400,55" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-foreground/10" />
              </svg>
            </div>
          </div>

          <div className="mt-6 border-b border-foreground/10">
            <div className="flex gap-6">
              {(["history", "positions"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setHistoryTab(t)} className={cn("cursor-pointer border-b-2 pb-3 text-sm font-medium transition-colors", historyTab === t ? "border-foreground text-foreground" : "border-transparent text-foreground/40 hover:text-foreground")}>
                  {t === "history" ? "Transactions History" : "My Positions"}
                </button>
              ))}
            </div>
          </div>
          <p className="py-12 text-center text-sm text-foreground/30">No data</p>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-foreground/10 p-6">
            <h2 className="text-xl font-bold text-foreground">
              {isPT ? "Fixing Yield" : "Leveraged Long Yield"}
            </h2>
            <p className="mt-1 text-xs text-foreground/40">
              Current {isPT ? "Fixed" : "Leveraged"} APR: {isPT ? market.fixedApr : `~${market.leverage}`}
            </p>

            <div className="mt-4 flex items-center gap-1 rounded-full border border-foreground/10 p-1">
              {(["PT", "YT"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setTokenTab(t)} className={cn("flex-1 cursor-pointer rounded-full py-2 text-center text-sm font-medium transition-colors", tokenTab === t ? "bg-foreground text-background" : "text-foreground/40 hover:text-foreground")}>
                  {t}
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-foreground/50">
              {isPT
                ? <>When you buy a <strong className="text-foreground">PT token</strong>, you fix your APR until maturity. <strong className="text-foreground">After maturity</strong>, you can redeem your tokens along with the yield.</>
                : <>When you buy <strong className="text-foreground">YT token</strong>, you buy yield from the underlying asset. At maturity you can claim yield in your Dashboard.</>
              }
            </p>

            {!isPT && (
              <div className="mt-3 rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3">
                <p className="text-[10px] font-semibold text-foreground">High-Risk Instrument</p>
                <p className="mt-0.5 text-[10px] text-foreground/40">The YT token is a high-risk product. Please assess your risk tolerance before proceeding.</p>
              </div>
            )}

            <div className="mt-5 border-b border-foreground/10">
              <div className="flex gap-4">
                {(["swap", "mint"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setActionTab(t)} className={cn("cursor-pointer border-b-2 pb-2 text-sm font-medium capitalize transition-colors", actionTab === t ? "border-foreground text-foreground" : "border-transparent text-foreground/40 hover:text-foreground")}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {actionTab === "swap" && (
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-1 rounded-full border border-foreground/10 p-0.5">
                  <button type="button" onClick={() => setSwapDir("buy")} className={cn("flex-1 cursor-pointer rounded-full py-1.5 text-center text-xs font-medium transition-colors", swapDir === "buy" ? "bg-foreground text-background" : "text-foreground/40")}>
                    Buy {tokenTab}
                  </button>
                  <button type="button" onClick={() => setSwapDir("sell")} className={cn("flex-1 cursor-pointer rounded-full py-1.5 text-center text-xs font-medium transition-colors", swapDir === "sell" ? "bg-foreground text-background" : "text-foreground/40")}>
                    Sell {tokenTab}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Input</span>
                  <span className="text-xs text-foreground/40">Max: 0 {market.name}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-foreground/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Image src={market.logo} alt="" width={28} height={28} className="size-7 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{market.name}</p>
                      <p className="text-[10px] text-foreground/40">{market.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">0</p>
                    <p className="text-[10px] text-foreground/40">$0</p>
                  </div>
                </div>

                <ArrowDownIcon className="mx-auto size-4 text-foreground/30" />

                <span className="text-sm font-medium text-foreground">Output</span>

                <div className="flex items-center justify-between rounded-2xl border border-foreground/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Image src={market.logo} alt="" width={28} height={28} className="size-7 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{tokenTab} {market.name}</p>
                      <p className="text-[10px] text-foreground/40">{market.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">0</p>
                    <p className="text-[10px] text-foreground/40">$0</p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-foreground/5 px-4 py-2">
                  <span className="text-xs text-foreground/40">Price impact</span>
                  <span className="text-xs text-foreground">0%</span>
                </div>
                <div className="flex items-center justify-between px-4 py-1">
                  <span className="text-xs text-foreground/40">Points</span>
                </div>

                <button type="button" className="mt-2 w-full cursor-pointer rounded-xl border border-foreground/10 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground/5">
                  Swap
                </button>
              </div>
            )}

            {actionTab === "mint" && (
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-1 rounded-full border border-foreground/10 p-0.5">
                  <button type="button" onClick={() => setMintDir("mint")} className={cn("flex-1 cursor-pointer rounded-full py-1.5 text-center text-xs font-medium transition-colors", mintDir === "mint" ? "bg-foreground text-background" : "text-foreground/40")}>
                    Mint
                  </button>
                  <button type="button" onClick={() => setMintDir("redeem")} className={cn("flex-1 cursor-pointer rounded-full py-1.5 text-center text-xs font-medium transition-colors", mintDir === "redeem" ? "bg-foreground text-background" : "text-foreground/40")}>
                    Redeem
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Input</span>
                  <span className="text-xs text-foreground/40">Max: 0 {mintDir === "mint" ? market.name : `PT/YT ${market.name}`}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-foreground/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Image src={market.logo} alt="" width={28} height={28} className="size-7 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{mintDir === "mint" ? market.name : `PT ${market.name}`}</p>
                      <p className="text-[10px] text-foreground/40">{market.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">0</p>
                    <p className="text-[10px] text-foreground/40">$0</p>
                  </div>
                </div>

                <ArrowDownIcon className="mx-auto size-4 text-foreground/30" />

                <span className="text-sm font-medium text-foreground">Output</span>

                <div className="flex items-center justify-between rounded-2xl border border-foreground/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Image src={market.logo} alt="" width={28} height={28} className="size-7 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{mintDir === "mint" ? `PT ${market.name}` : market.name}</p>
                      <p className="text-[10px] text-foreground/40">{market.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">0</p>
                    <p className="text-[10px] text-foreground/40">$0</p>
                  </div>
                </div>

                {mintDir === "mint" && (
                  <>
                    <PlusIcon className="mx-auto size-4 text-foreground/30" />
                    <div className="flex items-center justify-between rounded-2xl border border-foreground/10 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Image src={market.logo} alt="" width={28} height={28} className="size-7 rounded-full" />
                        <div>
                          <p className="text-sm font-medium text-foreground">YT {market.name}</p>
                          <p className="text-[10px] text-foreground/40">{market.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">0</p>
                        <p className="text-[10px] text-foreground/40">$0</p>
                      </div>
                    </div>
                  </>
                )}

                <button type="button" className="mt-2 w-full cursor-pointer rounded-xl border border-foreground/10 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground/5">
                  {mintDir === "mint" ? "Mint" : "Redeem"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
