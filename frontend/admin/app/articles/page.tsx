import React from "react"
import Link from "next/link"
import newsLetterApi from "@/app/_api/news-letter"
import WidthWrapper from "../_components/layout/width-wrapper"
import { Button } from "../_components/ui/button"
import { Checkbox } from "../_components/ui/checkbox"
import ArticleTable from "./_components/article-table"

const ArticlesPage = async (props: any) => {
  const { searchParams } = props

  const { page: _page, limit: _limit, name: _name } = searchParams

  let pageNumber = Number(_page || 0)
  let limitNumber = Number(_limit || 10)
  let name = _name && String(_name)

  const articleList = await newsLetterApi.getAdminArticleList({ page: pageNumber, limit: limitNumber, name: name })

  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">아티클 목록보기</h1>
      </div>

      <div className="h-12" />

      <div className="flex flex-col gap-3">
        <ArticleTable initialValues={articleList} initialPage={pageNumber} initialLimit={limitNumber} />
      </div>
    </WidthWrapper>
  )
}

export default ArticlesPage
