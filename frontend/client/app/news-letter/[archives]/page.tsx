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
import { Metadata } from "next"
import { OG_IMAGE } from "@/app/_meta/constant"

const fetchPublisher = async (id: string) => {
  return await detailApi.getPublisher({ publisherId: id })
}

interface ArchivesPageParams {
  archives: string
}

export async function generateMetadata({ params }: NextPageProps<ArchivesPageParams>): Promise<Metadata> {
  const { archives } = params

  const response = await fetchPublisher(archives)

  const { publisher } = response

  const title = publisher.name + " 상세페이지"
  const description = (publisher?.description || "").slice(0, 120)
  const images = [publisher.thumbnail || OG_IMAGE]

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
    },
  }
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
    queryFn: () => fetchPublisher(archives),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 60,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <IdContextProvider id={archives}>
        <div className="w-screen min-h-[100vh-1.2rem] bg-white">
          <Header />
          <main className="mx-auto w-full max-w-[128rem]">
            <NewsLetterTitle />
            <DescriptionLayer />
            <LastArticles />
            <SuggestNewsLetters />
            <TabletFixedButton />
          </main>
        </div>
      </IdContextProvider>
    </HydrationBoundary>
  )
}

export default ArchivesPage
