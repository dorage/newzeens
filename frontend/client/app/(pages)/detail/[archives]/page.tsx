import React from "react"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import Header from "@/app/_components/header"
import { NextPageProps } from "@/app/_types/next"
import getQueryClient from "@/app/_utils/query-client"
import NewsLetterTitle from "./components/news-letter-title"

interface ArchivesPageParams {}

const ArchivesPage = async (props: NextPageProps<ArchivesPageParams>) => {
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
  //     queryKey: ["archives"],
  //     queryFn: () => {},
  //     staleTime: 1000 * 60,
  //     gcTime: 1000 * 60 * 60,
  //   })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Header />

      <main className="mx-auto min-h-screen w-full max-w-7xl">
        <NewsLetterTitle />
      </main>
    </HydrationBoundary>
  )
}

export default ArchivesPage
