"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ConnectWalletButton } from "@/components/ui/connect-wallet-button"

const navLinks = [
  { label: "Earn", href: "/earn" },
  { label: "Portfolio", href: "/earn/portfolio" },
  { label: "Rewards", href: "/earn/rewards" },
  { label: "Faucet", href: "/earn/faucet" },
]

export function EarnHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/95 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/welcome" className="flex cursor-pointer items-center gap-2.5">
          <Image
            src="/Assets/Images/Logo-Brands/logo-leticia.png"
            alt="Leticia"
            width={36}
            height={36}
            className="size-9 select-none rounded-full"
          />
          <span className="text-lg font-medium tracking-[-0.04em] text-foreground">
            Leticia
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "cursor-pointer rounded-lg px-4 py-2 text-sm transition-colors",
                pathname === link.href
                  ? "font-medium text-foreground"
                  : "text-foreground/50 hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <ConnectWalletButton />
      </nav>
    </header>
  )
}
