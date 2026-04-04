import { PoolDetailPage } from "@/components/pages/(app)/pools"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PoolDetailPage slug={slug} />
}
