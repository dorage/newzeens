"use client"

import { SearchShortIcon } from "@/public/icons"
import { useSearchParams } from "next/navigation"
import React from "react"

interface EmptySearchProps {}

const EmptySearch = (props: EmptySearchProps) => {
  const {} = props

  const searchParams = useSearchParams()
  const word = searchParams.get("word")

  return (
    <div className="flex flex-col gap-20 items-center">
      <SearchShortIcon className="size-[108px] text-gray-40" />
      <div className="flex flex-col gap-12 items-center">
        <h4 className="text-gray-70 text-h2">
          <span className="text-primary">{word}</span>와 연관된 뉴스레터가 없어요.
        </h4>

        <p className="text-gray-60 text-body3">다른 단어로 검색해 보세요!</p>
      </div>
    </div>
  )
}

export default EmptySearch
