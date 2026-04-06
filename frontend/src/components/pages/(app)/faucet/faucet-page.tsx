"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { CheckIcon, Loader2Icon, WalletIcon } from "lucide-react"
import { useInterwovenKit } from "@initia/interwovenkit-react"
import { useReadContracts } from "wagmi"
import { encodeFunctionData, parseUnits, formatUnits } from "viem"
import { TOKEN_LIST, ERC20_ABI } from "@/config/contracts"
import { LETICIA_ROLLUP } from "@/config/network"

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
            <FaucetRow key={token.name} token={token} userAddress={address as string} />
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
  userAddress: string
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const { initiaAddress, hexAddress, requestTxBlock } = useInterwovenKit()

  const evmAddr = (hexAddress || userAddress) as `0x${string}`

  const { data: balanceResult, refetch } = useReadContracts({
    contracts: [
      {
        address: token.address,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [evmAddr],
      },
    ],
  })

  const balance = balanceResult?.[0]?.result
    ? formatUnits(balanceResult[0].result as bigint, token.decimals)
    : "0"

  const handleMint = useCallback(async () => {
    if (!initiaAddress) return
    setStatus("loading")

    try {
      const input = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: "mint",
        args: [evmAddr, parseUnits(MINT_AMOUNT, token.decimals)],
      })

      await requestTxBlock({
        chainId: LETICIA_ROLLUP.chainId,
        messages: [
          {
            typeUrl: "/minievm.evm.v1.MsgCall",
            value: {
              sender: initiaAddress,
              contractAddr: token.address,
              input,
              value: "0",
              accessList: [],
              authList: [],
            },
          },
        ],
      })

      setStatus("success")
      setTimeout(() => refetch(), 2000)
      setTimeout(() => setStatus("idle"), 4000)
    } catch {
      setStatus("idle")
    }
  }, [initiaAddress, evmAddr, token, requestTxBlock, refetch])

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
          disabled={status === "loading"}
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2Icon className="size-3.5 animate-spin" />
              Minting...
            </>
          ) : status === "success" ? (
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
