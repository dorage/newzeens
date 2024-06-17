import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import mainQueryKey from "./_apis/_query-key/main"
import mainApi from "./_apis/main-page/main"
import Header from "./_components/header"
import MainBanner from "./_components/home/main-banner"
import NewsLetterRanking from "./_components/home/new-letter-ranking"
import NewsLetterList from "./_components/home/news-letter-list"
import RecommendArticles from "./_components/home/recommend-articles"
import getQueryClient from "./_utils/query-client"

const getArticles = async () => {
  const start = performance.now()
  const result = await mainApi.getRecommendArticles()
  const end = performance.now()

  console.log(end - start + "ms")

  return result
}

export default async function Home() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: mainQueryKey.recommendArticles.list({}),
    queryFn: () => getArticles(),
  })

  await queryClient.prefetchQuery({
    queryKey: mainQueryKey.recommendPublishers.list({}),
    queryFn: () => mainApi.getRecommendPublishers(),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Header />
      <main className="min-h-screen">
        <MainBanner />
        <div className="mx-auto max-w-screen-xl">
          <div className="bg-white px-20 py-40 xl:px-40 xl:py-60">
            <RecommendArticles />
          </div>
          <div className="bg-white p-20 pb-40 xl:px-40 xl:pb-80">
            <NewsLetterRanking />
          </div>

          <div className="px-20 py-40 xl:px-40 xl:py-80">
            <NewsLetterList />
          </div>
        </div>
      </main>
    </HydrationBoundary>
  )
}
