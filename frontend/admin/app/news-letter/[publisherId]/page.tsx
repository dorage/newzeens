import React from "react"

import newsLetterApi from "@/app/_api/news-letter"
import { NextPageProps } from "@/app/_types/next"
import { dateFormat } from "@/app/_utils/date-format"
import { InitialDataContextProvider } from "./context/initial-data-context"
import DetailTemplates from "./detail-templates"
import KeywordFormInterceptor from "./@keywordForm/page"
import ArticleListInterceptor from "./@articleList/page"

interface PublisherDetailPageParams {
  publisherId: string
}

const PublisherDetailPage = async ({ params, searchParams }: NextPageProps<PublisherDetailPageParams>) => {
  const { publisherId } = params

  const publisher = await newsLetterApi.getAdminPublisher(publisherId)
  const keyword = await newsLetterApi.getAdminPublisherKeyword(publisherId)

  return (
    <InitialDataContextProvider publisher={publisher} keyword={keyword}>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">
          {publisher?.name}
          <span className="ml-2 text-[16px]">{dateFormat(publisher?.created_at)}</span>
        </h1>
      </div>

      <div className="h-12" />

      <DetailTemplates />

      <div className="h-10" />
      <KeywordFormInterceptor params={params} searchParams={searchParams} />

      <div className="h-12" />
      <ArticleListInterceptor params={params} searchParams={searchParams} />
    </InitialDataContextProvider>
  )
}

export default PublisherDetailPage
