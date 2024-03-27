import React from "react"
import Link from "next/link"
import newsLetterApi from "@/app/_api/news-letter"
import PublisherList from "./publisher-list"
import WidthWrapper from "../_components/layout/width-wrapper"
import { Button } from "../_components/ui/button"

let page = 0
const NewsLettersPage = async () => {
  const publisherList = await newsLetterApi.getAdminPublisherList({ page })

  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">
          리스트 관리 <span className="text-[#2141E5]">{100}</span>
        </h1>

        <Link href="/news-letter/create">
          <Button className="">등록</Button>
        </Link>
      </div>

      <div className="h-12" />

      <div className="flex flex-col gap-3">
        <PublisherList initialValues={publisherList} />
        {/* <InfiniteList initialData={publisherList} apiFunction={newsLetterApi.getAdminPublisherList}>
          {(data, i) => {
            return (
              <div key={data.id} className="flex items-center gap-2">
                <div className="flex w-full items-center bg-[#E0E5F7] px-5 py-4">
                  <p className="w-10 text-[18px] font-semibold">{i + 1}</p>

                  <div className="ml-2 size-12 overflow-hidden bg-white">
                    <Image
                      className="size-full object-cover"
                      src={data.thumbnail}
                      alt="썸네일"
                      width={48}
                      height={48}
                    />
                  </div>

                  <div className="ml-4 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <p className="text-[18px] font-semibold">{data.name}</p>
                      <span className="text-[14px] font-medium text-[#A2ABC7]">{data.publisher_main}</span>
                    </div>
                    <p className="text-[16px]">{data.description}</p>
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
            )
          }}
        </InfiniteList> */}
      </div>
    </WidthWrapper>
  )
}

export default NewsLettersPage
