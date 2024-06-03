import articleApi from "@/app/_api/article"
import { NextPageProps } from "@/app/_types/next"
import React from "react"

interface ArticleDetailPageProps {
  publisherId: string
  articleId: string
}

const ArticleDetailPage = async (props: NextPageProps<ArticleDetailPageProps>) => {
  const { params } = props
  const { articleId } = params

  const article = await articleApi.getAdminArticle({ id: articleId })
  return <div>{JSON.stringify(article)}</div>
}

export default ArticleDetailPage
