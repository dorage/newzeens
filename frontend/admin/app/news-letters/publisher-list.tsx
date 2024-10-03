"use client"
import React, { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { useRouter } from "next/navigation"
import newsLetterApi from "@/app/_api/news-letter"
import { AdminNewsLetterResponse } from "@/app/_api/news-letter.type"
import { Button } from "@/app/_components/ui/button"
import { useDebounce } from "../_hooks/use-debounce"
import { Input } from "../_components/ui/input"

interface PublisherListProps {
  initialValues: AdminNewsLetterResponse[]
}

const PublisherList = (props: PublisherListProps) => {
  const { initialValues } = props
  const router = useRouter()

  const [page, setPage] = useState(1)
  const [publishers, setPublishers] = useState<AdminNewsLetterResponse[]>(initialValues)
  const { ref, inView } = useInView()

  const [search, setSearch] = useState("")
  const searchDebounce = useDebounce(search)

  const fetchNext = useCallback(async () => {
    const addPublisher = await newsLetterApi.getAdminPublisherList({ page, name: searchDebounce })
    if (addPublisher.length === 0) {
      return
    }
    setPublishers((prev) => [...prev, ...addPublisher])
    setPage((prev) => prev + 1)
  }, [page, searchDebounce])

  const searchFetch = useCallback(async () => {
    const newItems = await newsLetterApi.getAdminPublisherList({ page: 0, name: searchDebounce })
    if (newItems.length === 0) {
      return
    }
    setPublishers(newItems)
    setPage((prev) => prev + 1)
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
      setPublishers(initialValues)
    }
  }, [initialValues, searchDebounce, searchFetch])

  return (
    <div className="flex flex-col gap-5">
      <Input
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="뉴스레터 이름으로 검색"
      />

      <div className="flex flex-col gap-3">
        {publishers?.map((publisher, i) => (
          <div
            key={publisher.id}
            className="flex items-center gap-2"
            onClick={() => router.push(`/news-letter/${publisher.id}`)}
          >
            <div className="flex w-full items-center bg-[#E0E5F7] px-5 py-4">
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
              // onClick={() => router.push(`/news-letter/${publisher.id}`)}
            >
              연필
            </Button>
            <Button className="!h-full bg-[#6D768E]">삭제</Button>
          </div>
        ))}
        <div ref={ref}>Loading...</div>
        {/* <button onClick={loadMoreUsers}>Load more</button> */}
      </div>
    </div>
  )
}

export default PublisherList
