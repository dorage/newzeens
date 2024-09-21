"use client"

import React, { useState } from "react"
import { NextPageProps } from "@/app/_types/next"
import classNames from "../_utils/class-names"
import IconRender, { ICON_LIST } from "../_components/atoms/icon-render"
import { useGetRank } from "../_actions/rank/get-rank"

interface RankingPageParams {}

const RankingPage = (props: NextPageProps<RankingPageParams>) => {
  const [current, setCurrent] = useState("전체")
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data } = useGetRank({
    limit: 20,
    keyword_id: undefined,
  })

  console.log(data)

  return (
    <div className="px-40 py-56">
      <main className="min-h-screen">
        <div className="grid grid-cols-[244px_1fr] gap-81">
          <div className="w-224 relative flex flex-col gap-8">
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

          {JSON.stringify(data)}
        </div>
      </main>
    </div>
  )
}

export default RankingPage
