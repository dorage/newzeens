"use server"

import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import RecommendArticles from "./client"
import mainQueryKey from "@/app/_apis/_query-key/main"
import mainApi from "@/app/_apis/main-page/main"
import getQueryClient from "@/app/_utils/query-client"

const getArticles = async () => {
  const result = await mainApi.getRecommendArticles()
  return result
}

const RecommendArticlesServer = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: mainQueryKey.recommendArticles.list({}),
    queryFn: getArticles,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="bg-white px-20 py-40 xl:px-40 xl:py-60">
        <RecommendArticles />
      </div>
    </HydrationBoundary>
  )
}
export default RecommendArticlesServer
