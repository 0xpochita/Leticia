"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckIcon, Loader2Icon, WalletIcon } from "lucide-react"
import { useInterwovenKit } from "@initia/interwovenkit-react"
import { useWriteContract, useWaitForTransactionReceipt, useReadContracts } from "wagmi"
import { parseUnits, formatUnits } from "viem"
import { TOKEN_LIST, ERC20_ABI } from "@/config/contracts"

const MINT_AMOUNT = "1000"

export function FaucetPage() {
  const { isConnected, address, openConnect } = useInterwovenKit()

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Faucet
      </h1>

      <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/50">
        Mint testnet tokens to try out the Earn Fixed Yield protocol.
        Each click mints 1,000 tokens to your wallet.
      </p>

      {!isConnected ? (
        <button
          type="button"
          onClick={openConnect}
          className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-foreground py-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          <WalletIcon className="size-4" />
          Connect Wallet to use Faucet
        </button>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {TOKEN_LIST.map((token) => (
            <FaucetRow key={token.name} token={token} userAddress={address as `0x${string}`} />
          ))}
        </div>
      )}
    </div>
  )
}

function FaucetRow({
  token,
  userAddress,
}: {
  token: (typeof TOKEN_LIST)[number]
  userAddress: `0x${string}`
}) {
  const [minted, setMinted] = useState(false)

  const { data: balanceResult } = useReadContracts({
    contracts: [
      {
        address: token.address,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [userAddress],
      },
    ],
  })

  const balance = balanceResult?.[0]?.result
    ? formatUnits(balanceResult[0].result as bigint, token.decimals)
    : "0"

  const { writeContract, data: txHash, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  const handleMint = () => {
    setMinted(false)
    writeContract({
      address: token.address,
      abi: ERC20_ABI,
      functionName: "mint",
      args: [userAddress, parseUnits(MINT_AMOUNT, token.decimals)],
    })
  }

  if (isSuccess && !minted) {
    setMinted(true)
  }

  const loading = isPending || isConfirming

  return (
    <div className="flex items-center justify-between rounded-2xl border border-foreground/10 px-5 py-4">
      <div className="flex items-center gap-3">
        <Image
          src={token.logo}
          alt={token.name}
          width={40}
          height={40}
          className="size-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-foreground">{token.name}</p>
          <p className="text-[11px] text-foreground/35">{token.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-foreground/40">Balance</p>
          <p className="text-sm font-semibold tabular-nums text-foreground">
            {Number(balance).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>

        <button
          type="button"
          onClick={handleMint}
          disabled={loading}
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2Icon className="size-3.5 animate-spin" />
              Minting...
            </>
          ) : minted ? (
            <>
              <CheckIcon className="size-3.5" />
              Minted
            </>
          ) : (
            <>Mint 1,000 {token.name}</>
          )}
        </button>
      </div>
    </div>
  )
}
