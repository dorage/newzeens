"use client"

import newsLetterApi from "@/app/_api/news-letter"
import { AdminNewsLetterResponse } from "@/app/_api/news-letter.type"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { useDebounce } from "@/app/_hooks/use-debounce"
import { cn } from "@/app/_lib/utils"
import Image from "next/image"
import React, { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import SlotPublisherForm from "./slot-publisher-form"
import { useSlotPublisherContext } from "../_context/slot-publisher-context"

interface PublisherAddProps {
  initialData: AdminNewsLetterResponse[]
}

const PublisherAdd = (props: PublisherAddProps) => {
  const { initialData } = props

  /**
   * 퍼블리셔 목록
   */
  const [page, setPage] = useState(1)
  const [publishers, setPublishers] = useState<AdminNewsLetterResponse[]>(initialData)

  const { ref, inView } = useInView()
  const [search, setSearch] = useState("")
  const searchDebounce = useDebounce(search)

  const fetchNext = useCallback(async () => {
    const addPublisher = await newsLetterApi.getAdminPublisherList({ page: page, name: searchDebounce })
    if (addPublisher.length === 0) {
      return
    }
    setPage((prev) => prev + 1)
    setPublishers((prev) => [...prev, ...addPublisher])
  }, [page, searchDebounce])

  const searchFetch = useCallback(async () => {
    const addPublisher = await newsLetterApi.getAdminPublisherList({ page: 0, name: searchDebounce })
    setPage((prev) => prev + 1)
    setPublishers(addPublisher)
  }, [searchDebounce])

  useEffect(() => {
    if (inView) {
      fetchNext()
    }
  }, [inView, fetchNext])

  useEffect(() => {
    if (searchDebounce) {
      setPage(0)
      searchFetch()
    } else {
      setPage(1)
      setPublishers(initialData)
    }
  }, [initialData, searchDebounce, searchFetch])

  const { select, initialValues, setSelect } = useSlotPublisherContext()

  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">뉴스레터 관리</h1>
      </div>
      <div className="h-12" />

      <SlotPublisherForm />

      <div className="h-5" />

      <Input
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="뉴스레터 이름으로 검색"
      />

      <div className="h-3" />

      <div className="flex flex-col gap-3">
        {publishers?.map((publisher, i) => {
          const isSelected = select.some((item) => (item.is_to_be_deleted ? false : item.id === publisher.id))

          return (
            <div key={`temp_${publisher.id}`} className="flex items-center gap-2">
              <div
                className={cn("flex w-full items-center px-5 py-4", {
                  "bg-[#E0E5F7]": isSelected,
                })}
              >
                <p className="w-10 text-[18px] font-semibold">{i + 1}</p>

                <div className="ml-2 size-12 shrink-0 overflow-hidden bg-white">
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
                  const isExist = select.find((item) => item.id === publisher.id)

                  if (isExist) {
                    console.log(`publisher`, publisher)
                    setSelect((prev) =>
                      prev.map((item) => {
                        if (item.id !== publisher.id) return item
                        return { ...item, is_to_be_deleted: false }
                      }),
                    )
                  } else {
                    setSelect((prev) => [...prev, publisher])
                  }
                }}
              >
                선택
              </Button>
              <Button
                className="!h-full bg-[#6D768E]"
                disabled={!isSelected}
                onClick={() => {
                  const isExist = initialValues.find((item) => item.id === publisher.id)

                  if (isExist) {
                    setSelect((prev) =>
                      prev.map((item) => {
                        if (item.id !== publisher.id) return item
                        return { ...item, is_to_be_deleted: true }
                      }),
                    )
                  } else {
                    setSelect((prev) => prev.filter((item) => item.id !== publisher.id))
                  }
                }}
              >
                제거
              </Button>
            </div>
          )
        })}
        <div ref={ref}>{"ㅤ"}</div>
      </div>
    </WidthWrapper>
  )
}

export default PublisherAdd
