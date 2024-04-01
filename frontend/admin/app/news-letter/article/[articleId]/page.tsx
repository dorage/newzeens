import newsLetterApi from "@/app/_api/news-letter"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { FormField } from "@/app/_components/ui/form"
import { NextPageProps } from "@/app/_types/next"
import { dateFormat } from "@/app/_utils/date-format"
import React from "react"
import ArticleForm from "./article-form"

interface ArticleDetailPageProps {
  articleId: string
  publisherId: string
}

const ArticleDetailPage = async (props: NextPageProps<ArticleDetailPageProps>) => {
  const { params } = props

  const { articleId, publisherId } = params

  const article = await newsLetterApi.getAdminArticle(articleId)

  return (
    <WidthWrapper>
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="text-[30px] font-bold">
            {article?.title}
            <span className="ml-2 text-[16px]">{dateFormat(article?.created_at)}</span>
          </h1>
        </div>

        <div className="h-12" />

        {JSON.stringify(article)}
        <ArticleForm />
      </div>
    </WidthWrapper>
  )
}

export default ArticleDetailPage
