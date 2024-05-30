import { create, createSlot } from "@/app/_actions/campaign"
import campaignApi from "@/app/_api/campaign"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { NextPageProps } from "@/app/_types/next"
import React from "react"
import { IdContextProvider } from "./_components/id-context"
import ArticleAdd from "./_components/article-add"
import newsLetterApi from "@/app/_api/news-letter"

interface CampaignSlotPageProps {
  campaignId: string
  slotId: string
}

const CampaignSlotPage = async (props: NextPageProps<CampaignSlotPageProps>) => {
  const { params } = props
  const campaignId = Number(params.campaignId)
  const slotId = Number(params.slotId)

  const publisher = await campaignApi.getAdminCampaignSlotPublisher(campaignId, slotId)
  const article = await campaignApi.getAdminCampaignSlotArticle(campaignId, slotId)

  const publisherList = await newsLetterApi.getAdminPublisherList({ page: 0 })

  return (
    <IdContextProvider campaignId={campaignId} slotId={slotId}>
      <WidthWrapper>
        <div className="flex items-center justify-between">
          <h1 className="text-[30px] font-bold">아티클 관리</h1>
        </div>

        <div className="h-12" />
      </WidthWrapper>

      <ArticleAdd initialValues={publisherList} />
    </IdContextProvider>
  )
}

export default CampaignSlotPage
