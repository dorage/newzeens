import WidthWrapper from "@/app/_components/layout/width-wrapper"
import React from "react"
import ArticleEdit from "../_components/article-edit"
import { NextPageProps } from "@/app/_types/next"
import newsLetterApi from "@/app/_api/news-letter"
import { SlotArticleContextProvider } from "../_context/slot-article-context"
import campaignApi from "@/app/_api/campaign"
import { IdContextProvider } from "../_context/id-context"

interface SlotArticlePageProps {
  campaignId: string
  slotId: string
}

const SlotArticlePage = async (props: NextPageProps<SlotArticlePageProps>) => {
  const { params } = props
  const campaignId = Number(params.campaignId)
  const slotId = Number(params.slotId)

  const campaignList = await campaignApi.getAdminCampaignSlotArticle(slotId)
  const articleList = await newsLetterApi.getAdminArticleList({ page: 0, is_enabled: true })

  return (
    <IdContextProvider campaignId={campaignId} slotId={slotId}>
      <WidthWrapper>
        <div className="flex items-center justify-between">
          <h1 className="text-[30px] font-bold">아티클 관리</h1>
        </div>
        <SlotArticleContextProvider initialValues={campaignList}>
          <ArticleEdit initialData={articleList} />
        </SlotArticleContextProvider>

        <div className="h-12" />
      </WidthWrapper>
    </IdContextProvider>
  )
}

export default SlotArticlePage
