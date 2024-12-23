import React from "react"
import Link from "next/link"
import newsLetterApi from "@/app/_api/news-letter"
import PublisherList from "./publisher-list"
import WidthWrapper from "../_components/layout/width-wrapper"
import { Button } from "../_components/ui/button"
import { NextPageProps } from "../_types/next"

let page = 0
const NewsLettersPage = async ({ searchParams }: NextPageProps) => {
  const { is_enabled, name } = searchParams

  const enabled = is_enabled === "true" || is_enabled === undefined

  const publisherList = await newsLetterApi.getAdminPublisherList({
    page: 0,
    is_enabled: enabled,
    name: name as string,
  })

  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">리스트 관리</h1>

        <Link href="/news-letter/create">
          <Button className="">등록</Button>
        </Link>
      </div>

      <div className="h-12" />

      <div className="flex flex-col gap-3">
        <PublisherList initialValues={publisherList} />
      </div>
    </WidthWrapper>
  )
}

export default NewsLettersPage
