"use client"

import React, { useState } from "react"
import Image from "next/image"
import KeywordTab from "../../atoms/keyword-tab"
import classNames from "@/app/_utils/class-names"
import Link from "next/link"
import { RANK_LIMIT, useGetKeywordQuery, useGetRank } from "@/app/_actions/rank/get-rank"
import { CrownIcon } from "@/public/icons"
import { sendEvent } from "@/app/_meta/track"

const NewsLetterRanking = () => {
  const [current, setCurrent] = useState("전체")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [keywordId, setKeywordId] = useState(0)

  const { data } = useGetRank({
    limit: RANK_LIMIT,
    keyword_id: keywordId === 0 ? undefined : keywordId,
  })

  const { data: keywordData = [] } = useGetKeywordQuery()
  const keywordDataWithAll = [{ name: "전체", id: 0 }, ...keywordData]

  const flatMap = (data?.pages ?? []).flatMap((page) => page).slice(0, 10)

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-mH3 text-gray-80 xl:text-h2">뉴스레터 랭킹</h3>

        <Link href="/ranking" className="text-mBody4 text-gray-60">
          더보기
        </Link>
      </div>

      {/* mobile only */}
      <div className="block xl:hidden">
        <div className="mt-12 flex gap-4 overflow-x-auto">
          {keywordDataWithAll.map((tab, i) => (
            <KeywordTab
              key={tab.name}
              isSelected={tab.name === current}
              onClick={() => {
                setCurrent(tab.name)
                setCurrentIndex(i)
                setKeywordId(tab.id)
              }}
            >
              {tab.name}
            </KeywordTab>
          ))}
        </div>
      </div>

      {/* mobile */}
      <div className="block xl:hidden">
        <div className="mt-24 flex flex-col gap-16">
          {flatMap.slice(0, 5).map((item, index) => {
            return (
              <div key={index} className="flex items-center">
                <p
                  className={classNames("text-mBody2 font-bold w-24", {
                    "text-primary": index < 3,
                  })}
                >
                  {index + 1}
                </p>

                <Link
                  href={`/news-letter/${item.id}`}
                  onClick={() => {
                    sendEvent("ranking_click", {
                      ...item,
                    })
                  }}
                >
                  <div className="flex items-center gap-8">
                    <div className="relative size-48">
                      <Image
                        src={item.thumbnail}
                        sizes="80px"
                        alt="next"
                        fill
                        className="rounded-8 aspect-square object-contain bg-bg border border-gray-40"
                      />
                    </div>

                    <div>
                      <p className="text-mBody2">{item.name}</p>
                      <p className="text-mElement1">
                        {item.keywords?.[0]?.keyword_name}
                        {item.subscriber > 0 && <span>· {`${_formatSubscriberCount(item.subscriber)} 구독`}</span>}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* pc */}
      <div className="hidden xl:block">
        <div className="mt-24 grid grid-cols-2 gap-16">
          {flatMap.map((item, index) => {
            const isRank = index < 3
            return (
              <div
                key={index}
                className="flex items-center"
                style={{
                  order:
                    index < 5
                      ? index + 1 // 첫 번째 열 (1, 2, 3, 4, 5)
                      : index - 4, // 두 번째 열 (6, 7, 8, 9, 10)
                }}
              >
                <p
                  className={classNames("text-mBody2 font-bold w-24", {
                    "text-primary": isRank,
                  })}
                >
                  {index + 1}
                </p>

                <Link
                  href={`/news-letter/${item.id}`}
                  onClick={() => {
                    sendEvent("ranking_click", {
                      ...item,
                    })
                  }}
                >
                  <div className="flex items-center gap-8">
                    <div className="relative size-48">
                      <Image
                        src={item.thumbnail}
                        sizes="80px"
                        alt="next"
                        fill
                        className="rounded-8 aspect-square bg-bg object-contain border border-gray-40"
                      />
                    </div>

                    <div className="flex gap-4 items-center">
                      <p className="text-mBody2 text-gray-80">{item.name}</p>

                      {isRank && <CrownIcon className="size-12" />}
                      <p className="text-mElement1 text-gray-70">{item.keywords?.[0]?.keyword_name}</p>

                      {item.subscriber > 0 && (
                        <div
                          className={classNames("border rounded-full py-4 px-6 text-element4", {
                            "text-gray-65 border-gray-65": !isRank,
                            "text-primary border-primary": isRank,
                          })}
                        >
                          {`${_formatSubscriberCount(item.subscriber)} 구독`}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NewsLetterRanking

const _formatSubscriberCount = (count: number) => {
  if (count >= 10000) {
    return Math.floor(count / 10000) + "만"
  }
  return count
}
