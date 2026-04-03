"use client"
import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon"
import { useScroll } from "@/components/ui/use-scroll"
import { LaunchButton } from "@/components/ui/launch-button"
import { createPortal } from "react-dom"

const links = [
  { label: "Resources", href: "#resources" },
  { label: "FAQ", href: "#faq" },
  { label: "Community", href: "#community" },
]

export function Header() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(10)

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent",
        scrolled && "border-border bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="/" className="cursor-pointer p-2">
          <Image
            src="/Assets/Images/Logo-Brands/logo-leticia.png"
            alt="Leticia"
            width={36}
            height={36}
            className="size-9 select-none rounded-full"
          />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              className="cursor-pointer text-xs tracking-[0.2em] text-foreground/60 uppercase transition-colors hover:text-foreground"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <LaunchButton size="sm" className="hidden md:inline-flex" />

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex size-10 cursor-pointer items-center justify-center text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>

      <MobileMenu open={open} className="flex flex-col justify-between gap-2">
        <div className="grid gap-y-1 pt-4">
          {links.map((link) => (
            <a
              key={link.label}
              className="cursor-pointer px-4 py-3 text-xs tracking-[0.2em] text-foreground/60 uppercase transition-colors hover:text-foreground"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#launch"
          className="mx-4 mb-4 cursor-pointer border border-foreground py-3 text-center text-xs tracking-[0.2em] text-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
        >
          Launch App
        </a>
      </MobileMenu>
    </header>
  )
}

type MobileMenuProps = React.ComponentProps<"div"> & {
  open: boolean
}

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === "undefined") return null

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg",
        "fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-border md:hidden",
      )}
    >
      <div
        data-slot={open ? "open" : "closed"}
        className={cn(
          "data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out",
          "size-full",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
