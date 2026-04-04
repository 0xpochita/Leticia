import { EarnDetailPage } from "@/components/pages/(app)/market/earn-detail-page"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <EarnDetailPage slug={slug} />
}
