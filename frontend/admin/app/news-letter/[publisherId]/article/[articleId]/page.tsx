import articleApi from "@/app/_api/article"
import { NextPageProps } from "@/app/_types/next"
import React from "react"
import { ArticleInitialContextProvider } from "./_context/article-initial-context"
import { dateFormat } from "@/app/_utils/date-format"
import ArticleForm from "./article-form"

interface ArticleDetailPageProps {
  publisherId: string
  articleId: string
}

const ArticleDetailPage = async (props: NextPageProps<ArticleDetailPageProps>) => {
  const { params } = props
  const { articleId } = params

  const article = await articleApi.getAdminArticle({ id: articleId })
  return (
    <ArticleInitialContextProvider initialValues={article}>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">아티클 수정하기</h1>
      </div>

      <div className="h-12" />

      <ArticleForm />
    </ArticleInitialContextProvider>
  )
}

export default ArticleDetailPage
