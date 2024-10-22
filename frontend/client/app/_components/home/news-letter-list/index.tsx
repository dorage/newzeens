"use client"

import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import NewsLetterItem from "./news-letter-item"
import KeywordTab from "../../atoms/keyword-tab"
import mainQueryKey from "@/app/_apis/_query-key/main"
import mainApi from "@/app/_apis/main-page/main"
import classNames from "@/app/_utils/class-names"
import IconRender from "../../atoms/icon-render"

const NewsLetterList = () => {
  const { data: publisherList } = useQuery({
    queryFn: mainApi.getRecommendPublishers,
    queryKey: mainQueryKey.recommendPublishers.list({}),
  })

  const [current, setCurrent] = useState("전체")
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="flex gap-80">
      <div className="hidden xl:block">
        <div className="w-[224px] relative flex flex-col gap-8">
          {publisherList?.slots?.map((tab, i) => (
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
      </div>

      {/* right content */}
      <div className="flex w-full flex-col gap-12">
        <h5 className="text-mH3 text-gray-80 xl:text-h2">{publisherList?.name}</h5>
        <div className="flex gap-4 overflow-x-auto xl:hidden">
          {publisherList?.slots?.map((tab, i) => (
            <KeywordTab
              key={tab.name}
              isSelected={tab.name === current}
              onClick={() => {
                setCurrent(tab.name)
                setCurrentIndex(i)
              }}
              className={classNames({
                "bg-white": tab.name !== current,
              })}
            >
              {tab.name}
            </KeywordTab>
          ))}
        </div>
        <div />
        <div className="w-full grid grid-cols-2 gap-x-12 gap-y-28 sm:grid-cols-3 xl:gap-x-16 xl:gap-y-40">
          {publisherList?.slots
            ?.find((slot) => slot.name === current)
            ?.publishers?.map((v) => {
              return <NewsLetterItem key={v.id} publisher={v} />
            })}
        </div>
      </div>
    </div>
  )
}

export default NewsLetterList
