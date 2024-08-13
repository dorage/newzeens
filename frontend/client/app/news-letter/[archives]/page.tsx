import React from "react"

import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

import detailQueryKey from "@/app/_apis/_query-key/detail"
import detailApi from "@/app/_apis/detail-page"
import Header from "@/app/_components/header"
import { IdContextProvider } from "@/app/_context/id-context"
import { NextPageProps } from "@/app/_types/next"
import getQueryClient from "@/app/_utils/query-client"
import DescriptionLayer from "./components/description-layer"
import LastArticles from "./components/last-articles"
import NewsLetterTitle from "./components/news-letter-title"
import SuggestNewsLetters from "./components/suggest-newsletters"
import TabletFixedButton from "./components/tablet-fixed-button"

interface ArchivesPageParams {
  archives: string
}

const ArchivesPage = async (props: NextPageProps<ArchivesPageParams>) => {
  // get Server queryClient
  const queryClient = getQueryClient()

  const {
    params: { archives },
  } = props

  // prefetch query
  await queryClient.prefetchQuery({
    queryKey: detailQueryKey.publisher.detail({ publisherId: archives }),
    queryFn: () => detailApi.getPublisher({ publisherId: archives }),
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
      <IdContextProvider id={archives}>
        <Header />

        <main className="mx-auto min-h-[100vh-60px] w-full max-w-[128rem]">
          <NewsLetterTitle />
          <DescriptionLayer />

          <LastArticles />
          <SuggestNewsLetters />
          <TabletFixedButton />
        </main>
      </IdContextProvider>
    </HydrationBoundary>
  )
}

export default ArchivesPage
