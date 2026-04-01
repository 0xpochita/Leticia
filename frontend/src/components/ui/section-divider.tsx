import { cn } from "@/lib/utils"

interface AngledSectionProps {
  children: React.ReactNode
  className?: string
}

export function AngledSection({ children, className }: AngledSectionProps) {
  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative w-full bg-foreground py-32 md:py-40",
          className,
        )}
        style={{
          clipPath: "polygon(0 8vw, 100% 0, 100% calc(100% - 8vw), 0 100%)",
        }}
      >
        {children}
      </div>
    </div>
  )
}
