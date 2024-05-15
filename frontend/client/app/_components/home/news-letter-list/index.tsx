"use client"

import React, { useCallback, useState } from "react"
import classNames from "@/app/_utils/class-names"
import { AllIcon, CareerIcon, EconomyIcon, HumanitiesIcon, ITIcon, LifestyleIcon, MarketingIcon } from "@/public/icons"

interface NewsLetterListProps {}

const MOCK = ["전체", "IT", "마케팅/브랜딩", "라이프스타일", "경제/시사", "인문/저널리즘", "커리어"]

const NewsLetterList = (props: NewsLetterListProps) => {
  const {} = props

  const [current, setCurrent] = useState("전체")
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
      {/* left category side */}
      <div className="hidden xl:block">
        <div className="w-224 relative flex flex-col gap-8">
          {MOCK.map((tab, i) => (
            <div
              key={tab}
              className={classNames(
                "flex rounded-full items-center gap-6 px-20 py-12 transition-colors duration-300 ease-in-out",
                { "text-white": current === tab },
              )}
              onClick={() => {
                setCurrent(tab)
                setCurrentIndex(i)
              }}
            >
              {IconRender(current === tab, i)}
              {tab}
            </div>
          ))}

          <div
            className="bg-gray-90 absolute -z-10 h-48 w-full rounded-full transition-all duration-300 ease-in-out"
            style={{ top: currentIndex * 56 }}
          />
        </div>
      </div>
    </div>
  )
}

export default NewsLetterList
