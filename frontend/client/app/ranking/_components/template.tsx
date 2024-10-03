"use client"

import { RANK_LIMIT, useGetRank } from "@/app/_actions/rank/get-rank"
import IconRender, { ICON_LIST } from "@/app/_components/atoms/icon-render"
import classNames from "@/app/_utils/class-names"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

const Template = () => {
  const [current, setCurrent] = useState("전체")
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
   } = useGetRank({
    limit: RANK_LIMIT,
    keyword_id: currentIndex === 0 ? undefined : currentIndex,
  })

  const flatMap = (data?.pages ?? []).flatMap((page) => page)


  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-[244px_1fr] gap-[81px] pt-56 pb-80 px-40">
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
          className="bg-gray-90 absolute -z-10 h-48 w-full rounded-full transition-all duration-300 ease-in-out"
          style={{ top: currentIndex * 56 }}
        />
      </div>

      <main className="">
        <h1 className="text-h2 text-gray-90 py-8">뉴스레터 랭킹</h1>

        <div className="h-20" />

        <div className="w-full grid grid-cols-[5%_60%_17.5%_17.5%] items-center text-element1 text-[#AEBDE7]">
          <div className="">순위</div>
          <div className="">뉴스레터명/발행인</div>
          <div className="">분야</div>
          <div className="text-end">구독자수</div>

          <div className="col-span-4 h-px bg-gray-50 mt-8 mb-12" />

          {flatMap.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  <div className="text-[18px] font-bold">{index + 1}</div>
                  <Link href={`/news-letter/${item.id}`}>
                  <div className="flex gap-8 h-fit items-center">
                    <div className="size-48 p-1 shrink-0 overflow-hidden rounded-8">
                      <Image src={item.thumbnail} className="object-cover" width={48} height={48} alt={item.name} />
                    </div>
                    <div className="flex gap-4 items-center">
                      <p className="text-body2 text-gray-70">{item.name}</p>
                      <p className="text-gray-60 text-element1">발행인1</p>
                    </div>
                  </div>
                  </Link>

                  <p className="text-body3 text-gray-70">{item.keywords?.[0]?.keyword_name}</p>
                  <p className="text-body3 text-gray-70 text-end">{_formatSubscriberCount(item.subscriber)}</p>

                  <div className="col-span-4 h-px bg-gray-50 my-12" />
                </React.Fragment>
              )
            })}
        </div>

{hasNextPage && <div className="mt-36">
          
          <button
              className="h-56 w-full bg-bg-4 text-gray-60 text-body3 rounded-full active:bg-bg-2 disabled:cursor-not-allowed"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? '로딩 중...' : '더보기'}
            </button>
          </div>}
        
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
