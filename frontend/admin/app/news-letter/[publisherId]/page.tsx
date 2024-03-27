import React from "react"
import { putPublisher } from "@/app/_actions"
import newsLetterApi from "@/app/_api/news-letter"
import { NextPageProps } from "@/app/_types/next"
import { dateFormat } from "@/app/_utils/date-format"
import { InitialDataContextProvider } from "./context/initial-data-context"
import DetailTemplates from "./detail-templates"

interface PublisherDetailPageParams {
  publisherId: string
}

const PublisherDetailPage = async ({ params }: NextPageProps<PublisherDetailPageParams>) => {
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

      <DetailTemplates action={putPublisher} />
    </InitialDataContextProvider>
  )
}

export default PublisherDetailPage
