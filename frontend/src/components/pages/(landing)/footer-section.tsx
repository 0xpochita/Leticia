import { ArrowRightIcon } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="relative w-full overflow-hidden bg-background border-t border-border">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-64 md:pt-32 md:pb-80">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Yield where rates
            <br />
            are discovered, not
            <br />
            imposed
          </h2>

          <div className="flex flex-col gap-6">
            <p className="max-w-sm text-base leading-relaxed text-foreground/50">
              Leticia replaces static yield curves with cross-chain tokenization
              settled on Initia EVM. Fair markets, composable by default.
            </p>
            <div>
              <a
                href="#docs"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Read the litepaper
                <ArrowRightIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden">
        <p
          className="whitespace-nowrap text-center font-bold uppercase text-foreground/5 leading-none"
          style={{ fontSize: "clamp(150px, 18vw, 300px)" }}
        >
          LETICIA
        </p>
      </div>
    </footer>
  )
}
