"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import newsLetterApi from "@/app/_api/news-letter"
import { AdminNewsLetterResponse } from "@/app/_api/news-letter.type"
import { Button } from "@/app/_components/ui/button"
import { Input } from "../_components/ui/input"
import { cn } from "../_lib/utils"
import { Switch } from "../_components/ui/switch"
import { revalidateTagPublisherList } from "../_actions"

interface PublisherListProps {
  initialValues: AdminNewsLetterResponse[]
}

const PublisherList = ({ initialValues }: PublisherListProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [page, setPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)

  const { ref, inView } = useInView()
  const [publishers, setPublishers] = useState<AdminNewsLetterResponse[]>(initialValues)

  const initialSearch = searchParams.get("name") || ""
  const initialIsEnabled = searchParams.get("is_enabled") == "true" || searchParams.get("is_enabled") === null

  const fetchNext = useCallback(async () => {
    const addPublisher = await newsLetterApi.getAdminPublisherList({
      page,
      name: initialSearch,
      is_enabled: initialIsEnabled,
    })
    if (addPublisher.length === 0) {
      setIsLastPage(true)
      return
    }
    setPublishers((prev) => [...prev, ...addPublisher])
    setPage((prev) => prev + 1)
  }, [page, initialIsEnabled, initialSearch])

  useEffect(() => {
    if (inView && !isLastPage) {
      fetchNext()
    }
  }, [inView, isLastPage, fetchNext])

  const [search, setSearch] = useState(initialSearch)
  const [isEnabled] = useState(initialIsEnabled)

  const updateQueryString = async (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams as any)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.replace(`?${params.toString()}`)
    await revalidateTagPublisherList()
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-5">
      <Input
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="뉴스레터 이름으로 검색"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateQueryString("name", search)
          }
        }}
      />

      <div className="flex items-center gap-5">
        활성화된 뉴스레터만 보기
        <Switch
          checked={isEnabled}
          onCheckedChange={(checked) => updateQueryString("is_enabled", checked ? "true" : "false")}
        />
      </div>

      <div className="flex flex-col gap-3">
        {publishers?.map((publisher, i) => {
          return (
            <div key={publisher.id} className="flex items-center gap-2">
              <div
                className={cn("flex w-full items-center bg-[#E0E5F7] px-5 py-4", {
                  "opacity-60": publisher.is_enabled === 0,
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
                  <div
                    className="group flex w-fit cursor-pointer items-center gap-1"
                    onClick={() => router.push(`/news-letter/${publisher.id}`)}
                  >
                    <p className="text-[18px] font-semibold group-hover:underline">{publisher.name}</p>
                    <span className="text-[14px] font-medium text-[#A2ABC7]">{publisher.publisher_main}</span>
                  </div>
                  <p className="text-[16px]">{publisher.description}</p>
                </div>
              </div>

              <Button className={cn("!h-full bg-[#637BF4]")}>수정</Button>
              <Button className="!h-full bg-[#6D768E]">삭제</Button>
            </div>
          )
        })}
        {!isLastPage && <div ref={ref}>Loading...</div>}
      </div>
    </div>
  )
}

export default PublisherList
