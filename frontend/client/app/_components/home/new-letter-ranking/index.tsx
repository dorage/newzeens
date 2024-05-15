"use client"

import React, { useState } from "react"
import Image from "next/image"
import KeywordTab from "../../atoms/keyword-tab"
import classNames from "@/app/_utils/class-names"

interface NewsLetterRankingProps {}

const MOCK = ["전체", "IT", "마케팅", "라이프스타일", "브랜딩", "그외..."]

const NewsLetterRanking = (props: NewsLetterRankingProps) => {
  const {} = props

  const [currentSelected, setCurrentSelected] = useState("전체")

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-mH3">뉴스레터 랭킹</h3>

        <p className="text-mBody4 text-gray-60">더보기</p>
      </div>

      <div className="mt-12 flex gap-4 overflow-x-auto">
        {MOCK.map((tab) => (
          <KeywordTab key={tab} isSelected={tab === currentSelected} onClick={() => setCurrentSelected(tab)}>
            {tab}
          </KeywordTab>
        ))}
      </div>

      <div className="mt-24 flex flex-col gap-16">
        {[...new Array(5)].map((_, index) => (
          <div key={index} className="flex items-center">
            <p
              className={classNames("text-mBody2 font-bold w-20", {
                "text-primary": index < 3,
              })}
            >
              {index + 1}
            </p>

            <div className="flex items-center gap-8">
              <div className="relative size-48">
                <Image
                  src="https://via.placeholder.com/60"
                  sizes="80px"
                  alt="next"
                  fill
                  className="rounded-8 aspect-square object-cover"
                />
              </div>

              <div>
                <p className="text-mBody2">뉴스레터명</p>
                <p className="text-mElement1">분야 및 구독자수</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsLetterRanking
