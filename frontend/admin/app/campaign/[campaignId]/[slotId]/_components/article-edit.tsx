"use client"

import newsLetterApi from "@/app/_api/news-letter"
import { AdminArticleResponse } from "@/app/_api/news-letter.type"
import { Input } from "@/app/_components/ui/input"
import { useDebounce } from "@/app/_hooks/use-debounce"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useSlotArticleContext } from "../_context/slot-article-context"
import { cn } from "@/app/_lib/utils"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import { putSlotArticle } from "@/app/_actions/campaign"
import { useParams } from "next/navigation"
import SlotArticleForm from "./slot-article-form"
import { useIdContext } from "../_context/id-context"

interface ArticleEditProps {
  initialValues?: AdminArticleResponse[]
}

const ArticleEdit = (props: ArticleEditProps) => {
  /**
   * 아티클 목록
   */
  const [page, setPage] = useState(0)
  const [articles, setArticles] = useState<AdminArticleResponse[]>([])

  const { ref, inView } = useInView()
  const [search, setSearch] = useState("")
  const searchDebounce = useDebounce(search)

  const fetchNext = async () => {
    const addPublisher = await newsLetterApi.getAdminArticleList({ page, name: searchDebounce })
    setArticles((prev) => [...prev, ...addPublisher])
    setPage((prev) => prev + 1)
  }

  const searchFetch = useCallback(async () => {
    const newItems = await newsLetterApi.getAdminArticleList({ page: 0, name: searchDebounce })
    setArticles(newItems)
    setPage((prev) => prev + 1)
  }, [searchDebounce])

  useEffect(() => {
    if (inView) {
      fetchNext()
    }
  }, [inView])

  useEffect(() => {
    if (searchDebounce) {
      setPage(0)
      searchFetch()
    } else {
      setArticles([])
    }
  }, [searchDebounce, searchFetch])

  const { slotId } = useIdContext()
  const { initialValues } = useSlotArticleContext()

  return (
    <div>
      <div className="h-5" />

      <SlotArticleForm />
      <div className="h-5" />

      <Input
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="뉴스레터 이름으로 검색"
      />

      <div className="h-3" />

      <div className="flex flex-col gap-3">
        {articles?.map((publisher, i) => {
          const isSelected = initialValues?.find((v) => v.id === publisher.id)

          return (
            <div key={`temp_${publisher.id}`} className="flex items-center gap-2">
              <div
                className={cn("flex w-full items-center px-5 py-4", {
                  "bg-[#E0E5F7]": isSelected,
                })}
              >
                <p className="w-10 text-[18px] font-semibold">{i + 1}</p>

                <div className="ml-2 size-12 overflow-hidden bg-white">
                  <Image
                    className="size-full object-cover"
                    src={publisher.thumbnail || ""}
                    alt="썸네일"
                    width={48}
                    height={48}
                  />
                </div>

                <div className="ml-4 flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <p className="text-[18px] font-semibold">{publisher.title}</p>
                    <span className="text-[14px] font-medium text-[#A2ABC7]">{publisher.publisher_id}</span>
                  </div>
                  <p className="text-[16px]">{publisher.summary}</p>
                </div>
              </div>

              <Button
                className={cn("!h-full", {
                  "bg-[#637BF4]": !isSelected,
                  "bg-[#6D768E]": isSelected,
                })}
                onClick={async () => {
                  await putSlotArticle(Number(slotId), {
                    [publisher.id]: true,
                  })
                }}
              >
                {isSelected ? "제거" : "추가"}
              </Button>
            </div>
          )
        })}
      </div>

      <div ref={ref}>{"ㅤ"}</div>
    </div>
  )
}

export default ArticleEdit
