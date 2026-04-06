"use client"

import Image from "next/image"
import { InfoIcon, WalletIcon } from "lucide-react"
import { useInterwovenKit } from "@initia/interwovenkit-react"
import { useReadContract, useReadContracts } from "wagmi"
import { formatUnits } from "viem"
import { FIXED_YIELD_VAULT, TOKEN_LIST, ERC20_ABI } from "@/config/contracts"

type TokenInfo = (typeof TOKEN_LIST)[number]

function findToken(address: string): TokenInfo | undefined {
  return TOKEN_LIST.find((t) => t.address.toLowerCase() === address.toLowerCase())
}

export function EarnPortfolioPage() {
  const { isConnected, address, hexAddress, openConnect } = useInterwovenKit()
  const evmAddr = (hexAddress || address || "") as `0x${string}`

  const { data: positions } = useReadContract({
    address: FIXED_YIELD_VAULT.address,
    abi: FIXED_YIELD_VAULT.abi,
    functionName: "getUserPositions",
    args: [evmAddr],
    query: { enabled: !!evmAddr && isConnected },
  })

  const { data: supportedAssets } = useReadContract({
    address: FIXED_YIELD_VAULT.address,
    abi: FIXED_YIELD_VAULT.abi,
    functionName: "getSupportedAssets",
  })

  const assetAddresses = (supportedAssets as `0x${string}`[]) || []

  const { data: vaultConfigs } = useReadContracts({
    contracts: assetAddresses.map((a) => ({
      address: FIXED_YIELD_VAULT.address,
      abi: FIXED_YIELD_VAULT.abi,
      functionName: "getVaultConfig" as const,
      args: [a],
    })),
  })

  const { data: balances } = useReadContracts({
    contracts: assetAddresses.map((a) => ({
      address: a,
      abi: ERC20_ABI,
      functionName: "balanceOf" as const,
      args: [evmAddr],
    })),
    query: { enabled: !!evmAddr && isConnected },
  })

  const positionList = (positions as { principal: bigint; fixedRate: bigint; maturity: bigint; depositedAt: bigint; withdrawn: boolean }[]) || []
  const activePositions = positionList.filter((p) => !p.withdrawn)

  const totalDeposited = activePositions.reduce((sum, p) => sum + Number(formatUnits(p.principal, 18)), 0)
  const totalEarned = activePositions.reduce((sum, p) => {
    const duration = Number(p.maturity - p.depositedAt)
    const elapsed = Math.min(Date.now() / 1000 - Number(p.depositedAt), duration)
    const rate = Number(formatUnits(p.fixedRate, 18))
    return sum + Number(formatUnits(p.principal, 18)) * rate * (elapsed / 31536000)
  }, 0)
  const avgRate = activePositions.length > 0
    ? Math.round(activePositions.reduce((sum, p) => sum + Number(formatUnits(p.fixedRate, 18)) * 100, 0) / activePositions.length)
    : 0

  if (!isConnected) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Portfolio</h1>
        <p className="mt-4 text-sm text-foreground/50">Connect your wallet to view your portfolio.</p>
        <button
          type="button"
          onClick={openConnect}
          className="mt-6 flex cursor-pointer items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          <WalletIcon className="size-4" />
          Connect Wallet
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Portfolio</h1>

      <div className="mt-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground/40">Total Deposited</span>
          <InfoIcon className="size-3 text-foreground/30" />
        </div>
        <p className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {totalDeposited.toLocaleString(undefined, { maximumFractionDigits: 2 })} tokens
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <div>
          <span className="text-xs text-foreground/40">Total Earned</span>
          <p className="mt-1 text-xl font-bold text-foreground">
            {totalEarned.toLocaleString(undefined, { maximumFractionDigits: 4 })}
          </p>
        </div>
        <div className="h-8 w-px bg-foreground/10" />
        <div>
          <span className="text-xs text-foreground/40">Avg APR</span>
          <p className="mt-1 text-xl font-bold text-foreground">{avgRate}%</p>
        </div>
        <div className="h-8 w-px bg-foreground/10" />
        <div>
          <span className="text-xs text-foreground/40">Positions</span>
          <p className="mt-1 text-xl font-bold text-foreground">{activePositions.length}</p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-foreground/10 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Active Deposits</p>
          <span className="text-xs text-foreground/40">{activePositions.length} positions</span>
        </div>

        {activePositions.length === 0 ? (
          <div className="mt-3 border-t border-foreground/5 pt-3">
            <span className="text-xs text-foreground/40">Currently no active deposits</span>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            {activePositions.map((pos, i) => {
              const principal = Number(formatUnits(pos.principal, 18))
              const rate = Math.round(Number(formatUnits(pos.fixedRate, 18)) * 100)
              const maturityDate = new Date(Number(pos.maturity) * 1000)
              const now = Date.now() / 1000
              const daysLeft = Math.max(0, Math.ceil((Number(pos.maturity) - now) / 86400))
              const elapsed = Math.min(now - Number(pos.depositedAt), Number(pos.maturity - pos.depositedAt))
              const earned = principal * (rate / 100) * (elapsed / 31536000)
              const isMatured = now >= Number(pos.maturity)

              const matchedToken = assetAddresses.reduce<TokenInfo | undefined>((found, addr, idx) => {
                if (found) return found
                const cfg = vaultConfigs?.[idx]?.result as [bigint, bigint, bigint, bigint, boolean] | undefined
                if (!cfg) return undefined
                const cfgRate = Math.round(Number(formatUnits(cfg[0], 18)) * 100)
                const cfgDuration = Number(cfg[1])
                const posDuration = Number(pos.maturity - pos.depositedAt)
                if (cfgRate === rate && cfgDuration === posDuration) return findToken(addr)
                return undefined
              }, undefined) || TOKEN_LIST[0]

              return (
                <div key={i} className="flex items-center justify-between border-t border-foreground/5 pt-3">
                  <div className="flex items-center gap-3">
                    <Image src={matchedToken.logo} alt={matchedToken.name} width={32} height={32} className="size-8 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {principal.toLocaleString(undefined, { maximumFractionDigits: 2 })} {matchedToken.name}
                      </p>
                      <p className="text-[11px] text-foreground/35">
                        {rate}% APR
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      +{earned.toFixed(4)} earned
                    </p>
                    <p className="text-[11px] text-foreground/35">
                      {isMatured ? "Matured" : `${daysLeft} days left — ${maturityDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}`}
                    </p>
                  </div>
                  {isMatured && (
                    <span className="rounded-full bg-foreground px-3 py-1 text-[10px] font-medium text-background">
                      Withdraw
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-foreground">My Assets</h2>
        <div className="mt-4">
          <div className="hidden items-center border-b border-foreground/10 pb-3 text-xs text-foreground/40 md:grid md:grid-cols-10 md:gap-4 md:px-4">
            <div className="col-span-3">Asset</div>
            <div className="col-span-2">Balance</div>
            <div className="col-span-2">Deposited</div>
            <div className="col-span-2">APR</div>
            <div className="col-span-1 text-right">Status</div>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            {assetAddresses.map((assetAddr, i) => {
              const token = findToken(assetAddr)
              if (!token) return null

              const config = vaultConfigs?.[i]?.result as [bigint, bigint, bigint, bigint, boolean] | undefined
              const rate = config ? Math.round(Number(formatUnits(config[0], 18)) * 100) : 0
              const deposited = config ? Number(formatUnits(config[3], 18)) : 0
              const bal = balances?.[i]?.result ? Number(formatUnits(balances[i].result as bigint, 18)) : 0
              const hasActivity = bal > 0 || deposited > 0

              return (
                <div
                  key={assetAddr}
                  className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-foreground/10 px-4 py-4 md:grid-cols-10"
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <Image src={token.logo} alt={token.name} width={36} height={36} className="size-9 rounded-full" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{token.name}</p>
                      <p className="text-xs text-foreground/40">{token.subtitle}</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-foreground">
                    {bal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div className="col-span-2 text-sm text-foreground">
                    {deposited.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div className="col-span-2 text-sm font-semibold text-foreground">{rate}%</div>
                  <div className="col-span-1 text-right">
                    <span className={`rounded-full px-3 py-1 text-[10px] ${hasActivity ? "bg-foreground text-background" : "bg-foreground/5 text-foreground/40"}`}>
                      {hasActivity ? "Active" : "Idle"}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
