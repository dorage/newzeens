import { create, createSlot } from "@/app/_actions/campaign"
import campaignApi from "@/app/_api/campaign"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { NextPageProps } from "@/app/_types/next"
import React from "react"
import PublisherAdd from "./_components/publisher-add"
import newsLetterApi from "@/app/_api/news-letter"
import ArticleEdit from "./_components/article-edit"
import articleApi from "@/app/_api/article"
import { IdContextProvider } from "./_context/id-context"
import { SlotPublisherContextProvider } from "./_context/slot-publisher-context"

interface CampaignSlotPageProps {
  campaignId: string
  slotId: string
}

const CampaignSlotPage = async (props: NextPageProps<CampaignSlotPageProps>) => {
  const { params } = props
  const campaignId = Number(params.campaignId)
  const slotId = Number(params.slotId)

  const publisher = await campaignApi.getAdminCampaignSlotPublisher(slotId)

  return (
    <IdContextProvider campaignId={campaignId} slotId={slotId}>
      {/* <WidthWrapper>
        <div className="flex items-center justify-between">
          <h1 className="text-[30px] font-bold">아티클 관리</h1>
        </div>
        <ArticleEdit initialValues={articleList} />

        <div className="h-12" />
      </WidthWrapper> */}

      <SlotPublisherContextProvider initialValues={publisher}>
        <PublisherAdd />
      </SlotPublisherContextProvider>
    </IdContextProvider>
  )
}

export default CampaignSlotPage
