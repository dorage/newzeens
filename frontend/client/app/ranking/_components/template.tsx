"use client"

import { RANK_LIMIT, useGetRank } from "@/app/_actions/rank/get-rank"
import IconRender, { ICON_LIST } from "@/app/_components/atoms/icon-render"
import KeywordTab from "@/app/_components/atoms/keyword-tab"
import { sendEvent } from "@/app/_meta/track"
import classNames from "@/app/_utils/class-names"
import { CrownIcon } from "@/public/icons"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

const Template = () => {
  const [current, setCurrent] = useState("전체")
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetRank({
    limit: RANK_LIMIT,
    keyword_id: currentIndex === 0 ? undefined : currentIndex,
  })

  const flatMap = (data?.pages ?? []).flatMap((page) => page)

  return (
    <div className="max-w-[1280px] w-full mx-auto grid xl:grid-cols-[244px_1fr] gap-[81px] pt-32 xl:pt-56 pb-80 px-20 xl:px-40">
      {/* pc only */}
      <div className="hidden xl:block">
        <div className="w-[224px] relative flex flex-col gap-8">
          {ICON_LIST.map((tab, i) => (
            <div
              key={tab.name}
              className={classNames(
                "flex rounded-full items-center gap-6 px-20 py-12 transition-colors duration-300 ease-in-out",
                { "text-white": current === tab.name },
              )}
              onClick={() => {
                setCurrent(tab.name)
                setCurrentIndex(i)
              }}
            >
              <IconRender index={i} isSelected={current === tab.name} />
              {tab.name}
            </div>
          ))}

          <div
            className="bg-gray-80 absolute -z-10 h-48 w-full rounded-full transition-all duration-300 ease-in-out"
            style={{ top: currentIndex * 56 }}
          />
        </div>
      </div>

      <main className="w-full">
        <h1 className="text-h2 text-gray-90 py-8">뉴스레터 랭킹</h1>

        <div className="h-12 xl:h-40" />

        <div className="block xl:hidden">
          <div className="max-w-[calc(100vw-40px)] flex gap-4 overflow-x-auto">
            {ICON_LIST.map((tab, i) => (
              <KeywordTab
                key={tab.name}
                isSelected={tab.name === current}
                onClick={() => {
                  setCurrent(tab.name)
                  setCurrentIndex(i)
                }}
                className={classNames("border-transparent", {
                  "bg-white": tab.name !== current,
                })}
              >
                {tab.name}
              </KeywordTab>
            ))}
          </div>
        </div>

        {/* mobile only */}
        <div className="block xl:hidden">
          <div className="flex flex-col gap-20 mt-28">
            {flatMap.map((item, index) => {
              const isRank = index < 3

              return (
                <div key={item.id} className="flex items-center">
                  <p
                    className={classNames("text-mBody2 tabular-nums font-bold w-36 mr-4 text-gray-60", {
                      "text-primary": isRank,
                    })}
                  >
                    {index + 1}
                  </p>

                  <Link
                    href={`/news-letter/${item.id}`}
                    className="w-full"
                    onClick={() => {
                      sendEvent("ranking_click", {
                        ...item,
                      })
                    }}
                  >
                    <div className="flex items-center gap-8">
                      <div className="relative size-48 flex justify-center items-center">
                        <Image
                          src={item.thumbnail}
                          sizes="80px"
                          alt="next"
                          fill
                          className="rounded-8 aspect-square object-contain bg-white"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-mBody2 text-gray-70">
                          {item.name}
                          {isRank && (
                            <div className="px-2">
                              <CrownIcon className="size-12" />
                            </div>
                          )}
                        </div>

                        <div className="flex gap-6 items-center mt-4">
                          <p className="text-mElement3 text-gray-70">발행인</p>
                          <p className="text-mElement3 text-[#AEBDE7]">
                            {item.keywords?.[0]?.keyword_name} · {`${_formatSubscriberCount(item.subscriber)} 구독 중`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* pc only */}
        <div className="hidden xl:block">
          <div className="w-full grid grid-cols-[5%_60%_17.5%_17.5%] items-center text-element1 text-[#AEBDE7]">
            <div className="">순위</div>
            <div className="">뉴스레터명/발행인</div>
            <div className="">분야</div>
            <div className="text-end">구독자수</div>

            <div className="col-span-4 h-px bg-gray-50 mt-8 mb-12" />

            {flatMap.map((item, index) => {
              const isRank = index < 3
              return (
                <React.Fragment key={item.id}>
                  <div
                    className={classNames("text-[18px] font-bold text-gray-70", {
                      "text-primary": isRank,
                    })}
                  >
                    {index + 1}
                  </div>
                  <Link
                    href={`/news-letter/${item.id}`}
                    onClick={() => {
                      sendEvent("ranking_click", {
                        ...item,
                      })
                    }}
                  >
                    <div className="flex gap-8 h-fit items-center">
                      <div className="size-48 p-1 bg-white shrink-0 overflow-hidden rounded-8 flex justify-center items-center">
                        <Image src={item.thumbnail} className="object-cover" width={48} height={48} alt={item.name} />
                      </div>
                      <div className="flex gap-4 items-center">
                        <p className="text-body1 text-gray-70">{item.name}</p>
                        <p className="text-gray-60 text-element1">발행인1</p>
                        {isRank && <CrownIcon className="size-12" />}
                      </div>
                    </div>
                  </Link>

                  <p className="text-body4 text-gray-70">{item.keywords?.[0]?.keyword_name}</p>
                  <p className="text-body4 text-gray-70 text-end">{_formatSubscriberCount(item.subscriber)}</p>

                  <div className="col-span-4 h-px bg-gray-50 my-12" />
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {hasNextPage && (
          <div className="mt-36">
            <button
              className="h-56 w-full bg-bg-4 text-gray-60 text-body3 rounded-full active:bg-bg-2 disabled:cursor-not-allowed"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? "로딩 중..." : "더보기"}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Template

const _formatSubscriberCount = (count: number) => {
  if (count >= 10000) {
    return Math.floor(count / 10000) + "만"
  }
  return count
}
