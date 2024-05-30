"use client"

import newsLetterApi from "@/app/_api/news-letter"
import { AdminNewsLetterResponse } from "@/app/_api/news-letter.type"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { Button } from "@/app/_components/ui/button"
import { cn } from "@/app/_lib/utils"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface ArticleAddProps {
  initialValues: AdminNewsLetterResponse[]
}

const ArticleAdd = (props: ArticleAddProps) => {
  const { initialValues } = props

  const [page, setPage] = useState(1)
  const [publishers, setPublishers] = useState<AdminNewsLetterResponse[]>(initialValues)
  const { ref, inView } = useInView()

  const fetchNext = async () => {
    const addPublisher = await newsLetterApi.getAdminPublisherList({ page })
    setPublishers((prev) => [...prev, ...addPublisher])
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (inView) {
      fetchNext()
    }
  }, [inView])

  const [select, setSelect] = useState<AdminNewsLetterResponse[]>([])

  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">뉴스레터 관리</h1>
      </div>
      <div className="h-12" />
      현재 선택: {select.length}개
      <div className="flex flex-col gap-3">
        {publishers?.map((publisher, i) => {
          const isSelected = select.some((item) => item.id === publisher.id)

          return (
            <div key={publisher.id} className="flex items-center gap-2">
              <div
                className={cn("flex w-full items-center px-5 py-4", {
                  "bg-[#E0E5F7]": isSelected,
                })}
              >
                <p className="w-10 text-[18px] font-semibold">{i + 1}</p>

                <div className="ml-2 size-12 overflow-hidden bg-white">
                  <Image
                    className="size-full object-cover"
                    src={publisher.thumbnail}
                    alt="썸네일"
                    width={48}
                    height={48}
                  />
                </div>

                <div className="ml-4 flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <p className="text-[18px] font-semibold">{publisher.name}</p>
                    <span className="text-[14px] font-medium text-[#A2ABC7]">{publisher.publisher_main}</span>
                  </div>
                  <p className="text-[16px]">{publisher.description}</p>
                </div>
              </div>

              <Button
                className="!h-full bg-[#637BF4]"
                disabled={isSelected}
                onClick={() => {
                  setSelect((prev) => [...prev, publisher])
                }}
              >
                선택
              </Button>
              <Button
                className="!h-full bg-[#6D768E]"
                disabled={!isSelected}
                onClick={() => {
                  setSelect((prev) => prev.filter((item) => item.id !== publisher.id))
                }}
              >
                제거
              </Button>
            </div>
          )
        })}
        <div ref={ref}>Loading...</div>
      </div>
    </WidthWrapper>
  )
}

export default ArticleAdd
