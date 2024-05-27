"use client"

import React, { useState } from "react"
import KeywordTab from "../../atoms/keyword-tab"
import ArticleCard from "../../card/article-card"

interface RecommendArticlesProps {}

const MOCK = ["기획자 · 마케터", "개발자", "디자이너", "누구나"]
// const MOCK = ["기획자 · 마케터", "개발자", "디자이너", "누구나", "누구나2"]

const RecommendArticles = (props: RecommendArticlesProps) => {
  const {} = props

  const [currentSelected, setCurrentSelected] = useState("기획자 · 마케터")

  return (
    <div className="">
      <div className="flex flex-col justify-between xl:flex-row xl:items-center">
        <h3 className="text-gray-80 text-mH3 xl:text-h2">
          <span className="text-primary hidden sm:inline">{currentSelected}&nbsp;</span>
          추천 아티클
        </h3>
        <div className="h-12 xl:hidden" />

        <div className="flex gap-4 overflow-x-auto">
          {MOCK.map((tab) => (
            <KeywordTab key={tab} isSelected={tab === currentSelected} onClick={() => setCurrentSelected(tab)}>
              {tab}
            </KeywordTab>
          ))}
        </div>
      </div>

      <div className="h-20 xl:h-16" />

      <div className="grid grid-cols-1 gap-28 sm:grid-cols-2 xl:grid-cols-4">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  )
}

export default RecommendArticles
