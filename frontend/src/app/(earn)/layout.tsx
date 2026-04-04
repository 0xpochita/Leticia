import { EarnHeader } from "@/components/ui/earn-header"

export default function EarnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <EarnHeader />
      <main className="grow">{children}</main>
    </div>
  )
}
