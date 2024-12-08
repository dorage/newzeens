import React from "react"
import { NextPageProps } from "@/app/_types/next"
import { getRank, RANK_LIMIT } from "../_actions/rank/get-rank"
import Header from "../_components/header"
import Template from "./_components/template"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import getQueryClient from "../_utils/query-client"
import { Metadata } from "next"
import rankApi, { JOB_KEYWORD_GROUP } from "../_apis/rank"

interface RankingPageParams {}

export const metadata: Metadata = {
  title: "랭킹",
}

const RankingPage = async (_props: NextPageProps<RankingPageParams>) => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["keyword", JOB_KEYWORD_GROUP],
    queryFn: rankApi.getKeyword,
  })

  const params = { limit: RANK_LIMIT, keyword_id: undefined }
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["rank", { ...params }],
    queryFn: () => getRank(params),
    initialPageParam: undefined,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Header />
      <div className="min-h-[calc(100vh-60px)]">
        <Template />
      </div>
    </HydrationBoundary>
  )
}

export default RankingPage
