"use client"

import searchApi from "@/app/_apis/search"
import NewsLetterItem from "@/app/_components/home/news-letter-list/news-letter-item"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import React from "react"
import { useInView } from "react-intersection-observer"

interface PublisherListProps {}

const PublisherList = (props: PublisherListProps) => {
  const {} = props

  const searchParams = useSearchParams()
  const word = searchParams.get("word") as string

  const { data = [] } = useQuery({
    queryKey: ["search", { word }],
    queryFn: () => searchApi.getSearch({ word }),
  })

  // const { ref, inView } = useInView()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-24 md:gap-x-16 md:gap-y-52">
      {data.map((v) => (
        <NewsLetterItem key={v.id} publisher={v} highlightWord={word} />
      ))}
      {/* <div ref={ref} /> */}
    </div>
  )
}

export default PublisherList
