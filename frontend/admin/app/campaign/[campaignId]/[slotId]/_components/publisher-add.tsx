"use client"

import campaignApi from "@/app/_api/campaign"
import newsLetterApi from "@/app/_api/news-letter"
import { AdminNewsLetterResponse } from "@/app/_api/news-letter.type"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { useDebounce } from "@/app/_hooks/use-debounce"
import { cn } from "@/app/_lib/utils"
import Image from "next/image"
import React, { useEffect, useState, useTransition } from "react"
import { useInView } from "react-intersection-observer"
import { useIdContext } from "./id-context"

interface PublisherAddProps {
  initialValues?: AdminNewsLetterResponse[]
}

const PublisherAdd = (props: PublisherAddProps) => {
  const { initialValues } = props

  const { campaignId, slotId } = useIdContext()

  const [page, setPage] = useState(0)
  const [publishers, setPublishers] = useState<AdminNewsLetterResponse[]>(initialValues || [])
  const [select, setSelect] = useState<AdminNewsLetterResponse[]>([])
  const { ref, inView } = useInView()
  const [search, setSearch] = useState("")
  const searchDebounce = useDebounce(search)

  const fetchNext = async () => {
    const addPublisher = await newsLetterApi.getAdminPublisherList({ page })
    setPublishers((prev) => [...prev, ...addPublisher])
    setPage((prev) => prev + 1)
  }

  const searchFetch = async () => {
    const addPublisher = await newsLetterApi.getAdminPublisherList({ page: 0, name: searchDebounce })
    setPublishers(addPublisher) // 검색 결과로 출판사 목록을 업데이트
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (searchDebounce) return
    if (inView) {
      fetchNext()
    }
  }, [inView])

  useEffect(() => {
    setPage(0)
    if (searchDebounce) {
      searchFetch()
    } else {
      setPublishers(initialValues || [])
    }
  }, [searchDebounce])

  const [pending, startTransition] = useTransition()

  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">뉴스레터 관리</h1>
      </div>
      <div className="h-12" />
      <div className="flex items-center justify-between">
        현재 선택: {select.length}개
        {/* <form action={() => {}}>
          <Button className="">저장</Button>
        </form> */}
      </div>

      <Input
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="뉴스레터 이름으로 검색"
      />
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
                onClick={async () => {
                  startTransition(async () => {
                    await campaignApi.postAdminCampaignSlotPublisher(campaignId, slotId, { publisher_id: publisher.id })
                  })
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

export default PublisherAdd
