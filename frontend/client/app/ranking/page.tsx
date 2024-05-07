import React from "react"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { NextPageProps } from "@/app/_types/next"
import getQueryClient from "@/app/_utils/query-client"

interface RankingPageParams {}

const RankingPage = async (props: NextPageProps<RankingPageParams>) => {
  // get Server queryClient
  const queryClient = getQueryClient()

  // Optional: define params
  const params = {}

  // prefetch query
  await queryClient.prefetchQuery({
    queryKey: [],
    queryFn: () => {},
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 60,
  })

  // prefetch infinite query
  //   await queryClient.prefetchInfiniteQuery({
  //     queryKey: [],
  //     queryFn: () => {},
  //     staleTime: 1000 * 60,
  //     gcTime: 1000 * 60 * 60,
  //   })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>RankingPage</div>
    </HydrationBoundary>
  )
}

export default RankingPage
