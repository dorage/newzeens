import React from "react"
import keywordApi from "@/app/_api/keyword"
import newsLetterApi from "@/app/_api/news-letter"
import { NextPageProps } from "@/app/_types/next"
import KeywordsForm from "../../form/keywords-form"
import { InitialDataContextProvider } from "../context/initial-data-context"

const KeywordFormInterceptor = async ({ params, searchParams }: NextPageProps<{ publisherId: string }>) => {
  const { publisherId } = params

  const keywordGroupList = await keywordApi.getAdminKeywordGroup()
  const keyword = await newsLetterApi.getAdminPublisherKeyword(publisherId as string)

  return (
    <InitialDataContextProvider keywordGroup={keywordGroupList} keyword={keyword}>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">
          키워드 관리
          <span className="ml-2 text-[16px]">{"테스트"}</span>
        </h1>
      </div>

      <div className="h-12" />

      <KeywordsForm initialData={keyword} />
    </InitialDataContextProvider>
  )
}

export default KeywordFormInterceptor
