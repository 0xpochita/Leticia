"use client"

import { useState } from "react"
import Image from "next/image"
import { SearchIcon, ArrowLeftIcon, InfoIcon, ChevronDownIcon, WalletIcon, Loader2Icon, CheckIcon } from "lucide-react"
import { useInterwovenKit } from "@initia/interwovenkit-react"
import { motion, AnimatePresence } from "framer-motion"
import { FiChevronRight } from "react-icons/fi"
import { useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseUnits, formatUnits } from "viem"
import { FIXED_YIELD_VAULT, TOKEN_LIST, ERC20_ABI } from "@/config/contracts"

type TokenInfo = (typeof TOKEN_LIST)[number]

export function EarnPage() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<TokenInfo | null>(null)

  const filtered = TOKEN_LIST.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Earn Fixed Yield
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
          <div className="w-[35%] shrink-0">Asset</div>
          <div className="w-[20%] shrink-0 text-right">Fixed APR</div>
          <div className="w-[25%] shrink-0 text-right">Total Deposited</div>
          <div className="w-[20%] shrink-0" />
        </div>

        <div className="divide-y divide-foreground/5">
          {filtered.length > 0 ? (
            filtered.map((token) => (
              <EarnRow key={token.name} token={token} onDeposit={() => setSelected(token)} />
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
          <DepositModal token={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function EarnRow({ token, onDeposit }: { token: TokenInfo; onDeposit: () => void }) {
  const { data: vaultConfig } = useReadContract({
    address: FIXED_YIELD_VAULT.address,
    abi: FIXED_YIELD_VAULT.abi,
    functionName: "getVaultConfig",
    args: [token.address],
  })

  const fixedRate = vaultConfig ? Math.round(Number(formatUnits((vaultConfig as [bigint, bigint, bigint, bigint, boolean])[0], 18)) * 100) : 0
  const totalDeposited = vaultConfig ? Number(formatUnits((vaultConfig as [bigint, bigint, bigint, bigint, boolean])[3], 18)) : 0

  return (
    <div className="flex flex-col items-center gap-4 px-5 py-4 transition-colors hover:bg-foreground/2 md:flex-row md:gap-0">
      <div className="flex w-[35%] shrink-0 items-center gap-3">
        <Image
          src={token.logo}
          alt={token.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-foreground">{token.name}</p>
          <p className="text-[11px] text-foreground/35">{token.subtitle}</p>
        </div>
      </div>

      <div className="w-[20%] shrink-0 text-right">
        <span className="text-lg font-bold text-foreground">{fixedRate}%</span>
      </div>

      <div className="w-[25%] shrink-0 text-right text-sm text-foreground/60">
        {totalDeposited > 0 ? `${totalDeposited.toLocaleString()} ${token.name}` : "0"}
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

function DepositModal({ token, onClose }: { token: TokenInfo; onClose: () => void }) {
  const { isConnected, address, openConnect } = useInterwovenKit()
  const [amount, setAmount] = useState("")
  const numAmount = Number.parseFloat(amount) || 0

  const { data: vaultConfig } = useReadContract({
    address: FIXED_YIELD_VAULT.address,
    abi: FIXED_YIELD_VAULT.abi,
    functionName: "getVaultConfig",
    args: [token.address],
  })

  const fixedRate = vaultConfig ? Math.round(Number(formatUnits((vaultConfig as [bigint, bigint, bigint, bigint, boolean])[0], 18)) * 100) : 0
  const duration = vaultConfig ? Number((vaultConfig as [bigint, bigint, bigint, bigint, boolean])[1]) : 0
  const daysLeft = Math.ceil(duration / 86400)

  const { data: balanceData } = useReadContracts({
    contracts: address
      ? [{ address: token.address, abi: ERC20_ABI, functionName: "balanceOf", args: [address as `0x${string}`] }]
      : [],
  })

  const balance = balanceData?.[0]?.result ? formatUnits(balanceData[0].result as bigint, token.decimals) : "0"
  const estimatedProfit = numAmount * (fixedRate / 100) * (daysLeft / 365)

  const { writeContract: writeApprove, data: approveTx, isPending: isApproving } = useWriteContract()
  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({ hash: approveTx })

  const { writeContract: writeDeposit, data: depositTx, isPending: isDepositing } = useWriteContract()
  const { isLoading: isDepositConfirming, isSuccess: isDepositSuccess } = useWaitForTransactionReceipt({ hash: depositTx })

  const handleDeposit = () => {
    if (numAmount <= 0) return
    const parsedAmount = parseUnits(amount, token.decimals)

    if (!isApproveSuccess) {
      writeApprove({
        address: token.address,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [FIXED_YIELD_VAULT.address, parsedAmount],
      })
    } else {
      writeDeposit({
        address: FIXED_YIELD_VAULT.address,
        abi: FIXED_YIELD_VAULT.abi,
        functionName: "deposit",
        args: [token.address, parsedAmount],
      })
    }
  }

  if (isApproveSuccess && !depositTx && !isDepositing) {
    const parsedAmount = parseUnits(amount, token.decimals)
    writeDeposit({
      address: FIXED_YIELD_VAULT.address,
      abi: FIXED_YIELD_VAULT.abi,
      functionName: "deposit",
      args: [token.address, parsedAmount],
    })
  }

  const loading = isApproving || isApproveConfirming || isDepositing || isDepositConfirming

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
            <Image src={token.logo} alt="" width={20} height={20} className="size-5 rounded-full" />
            <span className="text-sm text-foreground/60">Deposit {token.name}</span>
            <InfoIcon className="size-3.5 text-foreground/30" />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-foreground/40">
            {token.name} Balance: <strong className="text-foreground">{Number(balance).toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
          </span>
          <button
            type="button"
            onClick={() => setAmount(balance)}
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
            <Image src={token.logo} alt="" width={16} height={16} className="size-4 rounded-full" />
            <span className="text-sm text-foreground/50">{token.name}</span>
          </div>
        </div>

        <div className="flex flex-col gap-0 divide-y divide-foreground/5 rounded-2xl border border-foreground/10">
          <div className="flex items-center justify-between px-5 py-3">
            <span className="text-xs text-foreground/50">
              Estimated profit in <strong className="text-foreground">{daysLeft} days</strong>
            </span>
            <span className="text-xs font-semibold text-foreground">
              +{estimatedProfit.toFixed(4)} {token.name}
            </span>
          </div>

          <div className="flex items-center justify-between px-5 py-3">
            <span className="text-xs text-foreground/50">Fixed Annual Rate</span>
            <span className="text-sm font-bold text-foreground">{fixedRate}%</span>
          </div>

          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-1">
              <span className="text-xs text-foreground/50">Provider</span>
              <InfoIcon className="size-3 text-foreground/25" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-foreground">{token.subtitle}</span>
              <Image src={token.logo} alt="" width={16} height={16} className="size-4 rounded-full" />
              <ChevronDownIcon className="size-3 text-foreground/30" />
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[10px] text-foreground/30">
          *This deposit has smart contract and other risks. You accept it when depositing.
        </p>

        {isDepositSuccess ? (
          <div className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground/5 py-4 text-sm font-medium text-foreground">
            <CheckIcon className="size-4" />
            Deposit Successful
          </div>
        ) : !isConnected ? (
          <button
            type="button"
            onClick={openConnect}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-foreground py-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            <WalletIcon className="size-4" />
            Connect Wallet
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDeposit}
            disabled={loading || numAmount <= 0}
            className="mt-4 w-full cursor-pointer rounded-2xl bg-foreground py-4 text-center text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2Icon className="size-4 animate-spin" />
                {isApproving || isApproveConfirming ? "Approving..." : "Depositing..."}
              </span>
            ) : (
              "Deposit"
            )}
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
