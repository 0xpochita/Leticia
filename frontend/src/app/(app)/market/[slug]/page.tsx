import { MarketDetailPage } from "@/components/pages/(app)/market/market-detail-page"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <MarketDetailPage slug={slug} />
}
