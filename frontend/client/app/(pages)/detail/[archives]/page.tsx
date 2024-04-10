import React from "react"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import DescriptionLayer from "./components/description-layer"
import NewsLetterTitle from "./components/news-letter-title"
import SuggestNewsLetters from "./components/suggest-newsletters"
import Header from "@/app/_components/header"
import { NextPageProps } from "@/app/_types/next"
import getQueryClient from "@/app/_utils/query-client"

interface ArchivesPageParams {}

const ArchivesPage = async (props: NextPageProps<ArchivesPageParams>) => {
  // get Server queryClient
  const queryClient = getQueryClient()

  // Optional: define params
  const params = {}

  // prefetch query
  // await queryClient.prefetchQuery({
  //   queryKey: [],
  //   queryFn: () => {},
  //   staleTime: 1000 * 60,
  //   gcTime: 1000 * 60 * 60,
  // })

  // prefetch infinite query
  //   await queryClient.prefetchInfiniteQuery({
  //     queryKey: ["archives"],
  //     queryFn: () => {},
  //     staleTime: 1000 * 60,
  //     gcTime: 1000 * 60 * 60,
  //   })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Header />

      <main className="mx-auto min-h-[100vh-60px] w-full max-w-[128rem]">
        <NewsLetterTitle />
        <DescriptionLayer />

        {/* <LastArticle /> */}
        <SuggestNewsLetters />
      </main>
    </HydrationBoundary>
  )
}

export default ArchivesPage
