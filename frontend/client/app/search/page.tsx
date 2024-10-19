import { redirect } from "next/navigation"
import { NextPageProps } from "../_types/next"
import Header from "../_components/header"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import EmptySearch from "./_components/empty-search"
import PublisherList from "./_components/publisher-list"
import getQueryClient from "../_utils/query-client"
import searchApi from "../_apis/search"
import { Metadata } from "next"

interface SearchPageParams {}

export const metadata: Metadata = {
  title: "검색",
}

const SearchPage = async (props: NextPageProps<SearchPageParams>) => {
  const { searchParams } = props
  const word = searchParams.word

  if (!word || word.trim() === "") redirect("/")

  const queryClient = getQueryClient()

  const data = await queryClient.fetchQuery({
    queryKey: ["search", { word }],
    queryFn: () => searchApi.getSearch({ word }),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Header />
      <main className="min-h-[calc(100vh-60px)] max-w-screen-xl mx-auto">
        <div className="py-32 px-20 md:pt-56 md:px-40">
          <h1 className="text-mH3 md:text-h2 text-gray-90">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-12 after:bg-primary-4 after:rounded-full after:z-[-1]">
              {word}
            </span>{" "}
            검색 결과 <span className="text-gray-60">{data.length}</span>
          </h1>

          <div className="h-20 md:h-[26px]" />

          {!data.length && <EmptySearch />}
          <PublisherList />
        </div>
      </main>
    </HydrationBoundary>
  )
}

export default SearchPage
