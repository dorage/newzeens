import WidthWrapper from "@/app/_components/layout/width-wrapper"
import React from "react"
import ArticleEdit from "../_components/article-edit"
import { NextPageProps } from "@/app/_types/next"
import newsLetterApi from "@/app/_api/news-letter"

interface SlotArticlePageProps {
  campaignId: string
  slotId: string
}

const SlotArticlePage = async (props: NextPageProps<SlotArticlePageProps>) => {
  const { params } = props
  const campaignId = Number(params.campaignId)
  const slotId = Number(params.slotId)

  const articleList = await newsLetterApi.getAdminArticleList({})
  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">아티클 관리</h1>
      </div>
      <ArticleEdit initialValues={articleList} />

      <div className="h-12" />
    </WidthWrapper>
  )
}

export default SlotArticlePage
