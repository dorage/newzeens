"use client"

import React, { useState } from "react"
import KeywordTab from "../../atoms/keyword-tab"
import ArticleCard from "../../card/article-card"
import { useGetArticles } from "@/app/_actions/home/hooks"

interface RecommendArticlesProps {}

const RecommendArticles = (props: RecommendArticlesProps) => {
  const {} = props

  const { data } = useGetArticles()
  const [currentSelected, setCurrentSelected] = useState(data?.slots?.[0].name)

  return (
    <div>
      <div className="flex flex-col justify-between xl:flex-row xl:items-center">
        <h3 className="text-gray-80 text-mH3 xl:text-h2">
          <span className="text-primary hidden sm:inline">{currentSelected}&nbsp;</span>
          {data?.name}
        </h3>
        <div className="h-12 xl:hidden" />

        <div className="flex gap-4 overflow-x-auto">
          {data?.slots.map((tab) => (
            <KeywordTab
              key={tab.name}
              isSelected={tab.name === currentSelected}
              onClick={() => setCurrentSelected(tab.name)}
            >
              {tab.name}
            </KeywordTab>
          ))}
        </div>
      </div>

      <div className="h-20 xl:h-16" />

      <div className="grid grid-cols-1 gap-28 sm:grid-cols-2 xl:grid-cols-4">
        {data?.slots
          .find((slot) => slot.name === currentSelected)
          ?.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
      </div>
    </div>
  )
}

export default RecommendArticles

export const RecommendArticlesFallback = (props: any) => {
  console.log(`props`, props)
  return <div>gdgd</div>
}
