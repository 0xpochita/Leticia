import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LaunchButtonProps {
  href?: string
  className?: string
  label?: string
  size?: "sm" | "default"
}

export function LaunchButton({
  href = "/welcome",
  className,
  label = "Launch App",
  size = "default",
}: LaunchButtonProps) {
  const isSmall = size === "sm"

  return (
    <a
      href={href}
      className={cn(
        "group inline-flex cursor-pointer items-center rounded-full bg-foreground transition-colors duration-500 ease-in-out hover:bg-secondary",
        isSmall ? "gap-1 py-1 pr-1 pl-4" : "gap-2 py-1.5 pr-1.5 pl-6",
        className,
      )}
    >
      <span
        className={cn(
          "font-medium tracking-[0.15em] text-background uppercase transition-colors duration-500 ease-in-out group-hover:text-foreground",
          isSmall ? "text-[10px]" : "text-xs",
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-full bg-background/15 text-background transition-colors duration-500 ease-in-out group-hover:bg-foreground/15 group-hover:text-foreground",
          isSmall ? "size-7" : "size-9",
        )}
      >
        <ArrowUpRight
          className={cn(
            "absolute transition-all duration-500 ease-in-out group-hover:translate-x-10",
            isSmall ? "size-3" : "size-4",
          )}
        />
        <ArrowUpRight
          className={cn(
            "absolute -translate-x-10 transition-all duration-500 ease-in-out group-hover:translate-x-0",
            isSmall ? "size-3" : "size-4",
          )}
        />
      </div>
    </a>
  )
}
