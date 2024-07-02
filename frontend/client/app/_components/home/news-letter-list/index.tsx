"use client"

import React, { useCallback, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import NewsLetterItem from "./news-letter-item"
import KeywordTab from "../../atoms/keyword-tab"
import mainQueryKey from "@/app/_apis/_query-key/main"
import mainApi from "@/app/_apis/main-page/main"
import classNames from "@/app/_utils/class-names"
import { AllIcon, CareerIcon, EconomyIcon, HumanitiesIcon, ITIcon, LifestyleIcon, MarketingIcon } from "@/public/icons"

interface NewsLetterListProps {}

const NewsLetterList = (props: NewsLetterListProps) => {
  const {} = props

  const { data: publisherList } = useQuery({
    queryFn: mainApi.getRecommendPublishers,
    queryKey: mainQueryKey.recommendPublishers.list({}),
  })

  console.log("🚀 ~ NewsLetterList ~ publisherList:", publisherList)
  const [current, setCurrent] = useState("누구나")
  const [currentIndex, setCurrentIndex] = useState(0)

  const IconRender = useCallback((isSelected: boolean, index: number) => {
    switch (index) {
      case 0:
        return <AllIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />

      case 1:
        return <ITIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />

      case 2:
        return (
          <MarketingIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />
        )

      case 3:
        return (
          <LifestyleIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />
        )

      case 4:
        return <EconomyIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />

      case 5:
        return (
          <HumanitiesIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />
        )

      case 6:
        return <CareerIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />
    }
  }, [])

  return (
    <div className="flex gap-80">
      <div className="hidden xl:block">
        <div className="w-224 relative flex flex-col gap-8">
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
              {IconRender(current === tab.name, i)}
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
      <div className="flex w-full flex-col gap-12 px-20">
        <h5 className="text-mH3 text-gray-80 xl:text-h2">{publisherList?.name}</h5>
        <div className="flex gap-4 overflow-x-auto xl:hidden">
          {publisherList?.slots?.map((tab) => (
            <KeywordTab
              key={tab.name}
              isSelected={tab.name === current}
              onClick={() => setCurrent(tab.name)}
              className={classNames({
                "bg-white": tab.name !== current,
              })}
            >
              {tab.name}
            </KeywordTab>
          ))}
        </div>
        <div /> {/* gap */}
        {/* content */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-28 sm:grid-cols-3 xl:gap-x-16 xl:gap-y-40">
          {publisherList?.slots
            ?.find((slot) => slot.name === current)
            ?.publishers?.map((v) => {
              return <NewsLetterItem key={v.id} publisher={v} />
            })}

          {/* {[...new Array(10)].map((_, index) => (
            <NewsLetterItem key={index} />
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default NewsLetterList
