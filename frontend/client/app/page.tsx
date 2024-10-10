import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import mainQueryKey from "./_apis/_query-key/main"
import mainApi from "./_apis/main-page/main"
import Header from "./_components/header"
import MainBanner from "./_components/home/main-banner"
import RecommendArticles from "./_components/home/recommend-articles/client"
import getQueryClient from "./_utils/query-client"
import NewsLetterList from "./_components/home/news-letter-list"
import NewsLetterRanking from "./_components/home/new-letter-ranking"
import { getArticles } from "./_actions/home/get-articles"
import { getRank, RANK_LIMIT } from "./_actions/rank/get-rank"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "직무 트렌드 뉴스레터 모아보기",
}

export default async function Home() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryFn: () => getArticles(),
    queryKey: mainQueryKey.recommendArticles.list({}),
  })

  await queryClient.prefetchQuery({
    queryKey: mainQueryKey.recommendPublishers.list({}),
    queryFn: () => mainApi.getRecommendPublishers(),
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
      <main className="min-h-screen">
        <MainBanner />
        <div className="mx-auto max-w-screen-xl">
          <div className="pt-40 px-20 xl:pt-60 xl:px-40 bg-white">
            <RecommendArticles />
            <div className="h-40 xl:h-80" />

            <div className="pt-20 pb-40 xl:pt-0 xl:pb-80">
              <NewsLetterRanking />
            </div>
          </div>

          <div className="pt-40 xl:pt-80 pb-[140px] px-20 xl:px-40">
            <NewsLetterList />
          </div>
        </div>
      </main>
    </HydrationBoundary>
  )
}
