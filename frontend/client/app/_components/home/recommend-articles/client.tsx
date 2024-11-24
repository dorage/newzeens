"use client"

import React, { useState } from "react"
import KeywordTab from "../../atoms/keyword-tab"
import ArticleCard from "../../card/article-card"
import { useGetArticles } from "@/app/_actions/home/hooks"
import classNames from "@/app/_utils/class-names"

interface RecommendArticlesProps {}

const RecommendArticles = (props: RecommendArticlesProps) => {
  const {} = props

  const { data } = useGetArticles()
  const [currentSelected, setCurrentSelected] = useState(data?.slots?.[0].name)

  return (
    <div>
      <div className="flex flex-col justify-between xl:flex-row xl:items-center">
        <h3 className="text-gray-80 text-mH3 xl:text-h2">{data?.name}</h3>
        <div className="h-12 xl:hidden" />

        {/* mobile */}
        <div className="block xl:hidden">
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

        {/* pc */}
        <div className="hidden xl:block">
          {data?.slots.map((tab) => (
            <button
              key={tab.name}
              className={classNames(
                "h-[38px] text-body3 py-8 px-12 rounded-full transition-all duration-300 ease-in-out",
                {
                  "text-gray-70 bg-bg-3": tab.name === currentSelected,
                  "text-gray-60 font-medium": tab.name !== currentSelected,
                },
              )}
              onClick={() => setCurrentSelected(tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="h-20 xl:h-16" />

      <div className="grid grid-cols-1 gap-28 xl:gap-16 sm:grid-cols-2 xl:grid-cols-4">
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
