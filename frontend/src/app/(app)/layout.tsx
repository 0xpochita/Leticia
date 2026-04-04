import { AppHeader } from "@/components/ui/app-header"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="grow">{children}</main>
    </div>
  )
}
