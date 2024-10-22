import articleApi from "@/app/_api/article"
import { NextPageProps } from "@/app/_types/next"
import React from "react"
import { dateFormat } from "@/app/_utils/date-format"
import ArticleForm from "../[articleId]/article-form"
import { ArticleInitialContextProvider } from "../[articleId]/_context/article-initial-context"
import { postArticle } from "@/app/_actions"

interface ArticleCreatePageProps {
  publisherId: string
}

const ArticleCreatePage = async (props: NextPageProps<ArticleCreatePageProps>) => {
  const { params } = props

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">아티클 등록하기</h1>
      </div>

      <div className="h-12" />

      <ArticleForm action={postArticle} />
    </div>
  )
}

export default ArticleCreatePage
