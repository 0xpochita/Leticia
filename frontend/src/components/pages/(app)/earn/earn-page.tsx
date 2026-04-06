"use client"

import { useState } from "react"
import Image from "next/image"
import { SearchIcon, LockIcon, ArrowLeftIcon, InfoIcon, ChevronDownIcon, WalletIcon } from "lucide-react"
import { useInterwovenKit } from "@initia/interwovenkit-react"
import { motion, AnimatePresence } from "framer-motion"
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
    logo: "/Assets/Images/Logo/init-logo.png",
    apr: "12%",
    deposited: "$124.5K",
    maturity: "30 Jun 2026",
    daysLeft: 87,
  },
  {
    name: "USDe",
    subtitle: "Ethena Stablecoin",
    logo: "/Assets/Images/Logo/usde-logo.svg",
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
  const [selected, setSelected] = useState<EarnAsset | null>(null)

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
        needed just pick an asset and start earning.
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
              <EarnRow key={asset.name} asset={asset} onDeposit={() => setSelected(asset)} />
            ))
          ) : (
            <p className="py-12 text-center text-xs text-foreground/30">
              No results
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <DepositModal asset={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function EarnRow({ asset, onDeposit }: { asset: EarnAsset; onDeposit: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 px-5 py-4 transition-colors hover:bg-foreground/2 md:flex-row md:gap-0">
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
          onClick={onDeposit}
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Deposit
          <FiChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

function DepositModal({ asset, onClose }: { asset: EarnAsset; onClose: () => void }) {
  const [amount, setAmount] = useState("")
  const numAmount = Number.parseFloat(amount) || 0
  const estimatedProfit = numAmount * (Number.parseFloat(asset.apr) / 100) * (asset.daysLeft / 365)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={() => {}}
        role="button"
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-md rounded-3xl bg-background p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="flex cursor-pointer items-center gap-1.5 text-sm text-foreground/50 transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            Back
          </button>
          <div className="flex items-center gap-1.5">
            <Image src={asset.logo} alt="" width={20} height={20} className="size-5 rounded-full" />
            <span className="text-sm text-foreground/60">Deposit {asset.name}</span>
            <InfoIcon className="size-3.5 text-foreground/30" />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-foreground/40">
            {asset.name} Balance: <strong className="text-foreground">0.00</strong>
          </span>
          <button
            type="button"
            className="cursor-pointer rounded border border-foreground/15 px-2 py-0.5 text-[10px] font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            max
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 py-8">
          <input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            className="w-full text-center text-6xl font-bold text-foreground outline-none placeholder:text-foreground/20"
          />
          <div className="flex items-center gap-1.5">
            <Image src={asset.logo} alt="" width={16} height={16} className="size-4 rounded-full" />
            <span className="text-sm text-foreground/50">{asset.name}</span>
          </div>
          <span className="text-xs text-foreground/30">
            ${numAmount > 0 ? numAmount.toFixed(2) : "0"}
          </span>
        </div>

        <div className="flex flex-col gap-0 divide-y divide-foreground/5 rounded-2xl border border-foreground/10">
          <div className="flex items-center justify-between px-5 py-3">
            <span className="text-xs text-foreground/50">
              Estimated profit in <strong className="text-foreground">{asset.daysLeft} days</strong>
            </span>
            <span className="text-xs font-semibold text-foreground">
              +{estimatedProfit.toFixed(4)} {asset.name}
            </span>
          </div>

          <div className="flex items-center justify-between px-5 py-3">
            <span className="text-xs text-foreground/50">Fixed Annual Rate</span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-foreground">{asset.apr}</span>
              <div className="flex items-center gap-1 text-xs text-foreground/40">
                <span>Return on</span>
                <span className="font-medium text-foreground">{asset.maturity}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-1">
              <span className="text-xs text-foreground/50">Provider</span>
              <InfoIcon className="size-3 text-foreground/25" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-foreground">{asset.subtitle}</span>
              <Image src={asset.logo} alt="" width={16} height={16} className="size-4 rounded-full" />
              <ChevronDownIcon className="size-3 text-foreground/30" />
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex cursor-pointer items-center gap-1 text-xs text-foreground/40 hover:text-foreground">
              More details
              <ChevronDownIcon className="size-3" />
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[10px] text-foreground/30">
          *This deposit has smart contract and other risks. You accept it when depositing.
        </p>

        <DepositCTA />
      </motion.div>
    </motion.div>
  )
}

function DepositCTA() {
  const { isConnected, openConnect } = useInterwovenKit()

  if (isConnected) {
    return (
      <button
        type="button"
        className="mt-4 w-full cursor-pointer rounded-2xl bg-foreground py-4 text-center text-sm font-medium text-background transition-colors hover:bg-foreground/90"
      >
        Deposit
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={openConnect}
      className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-foreground py-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
    >
      <WalletIcon className="size-4" />
      Connect Wallet
    </button>
  )
}
