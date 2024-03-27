import React from "react"
import { revalidateTag } from "next/cache"
import { createKeyword } from "@/app/_actions"
import keywordKey from "@/app/_api/fetch-key/keyword"
import keywordApi from "@/app/_api/keyword"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { Button } from "@/app/_components/ui/button"
import { Switch } from "@/app/_components/ui/switch"
import { NextPageProps } from "@/app/_types/next"
import KeywordEditable from "./keyword-editable"

interface KeywordDetailPageParams {
  groupId: string
}

const KeywordDetailPage = async ({ params, searchParams: _searchParams }: NextPageProps<KeywordDetailPageParams>) => {
  const { groupId: _groupId } = params
  const groupId = Number(_groupId)

  const keywords = await keywordApi.getAdminKeyword(groupId)

  const list = await keywordApi.getAdminKeywordGroup()
  const current = list.find((item) => item.id === groupId)

  const createAction = async (formData: FormData) => {
    "use server"
    createKeyword(groupId, formData)
    revalidateTag(keywordKey.detail(groupId))
  }

  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px]">
          그룹 관리: <b>{current?.name}</b>
          {/* <span className="text-[#2141E5]">{groupList?.length}</span> */}
        </h1>

        <Button variant="destructive" className="" type="button">
          그룹 삭제
        </Button>
      </div>

      <div className="h-12" />

      {keywords?.map((keyword) => {
        return <KeywordEditable key={keyword.id} keyword={keyword} />
      })}

      <div className="h-12" />

      {/* 추가 */}
      <form action={createAction} className="flex flex-wrap items-center gap-4">
        <input type="text" name="keyword_name" className="h-[40px] w-[300px] rounded-md border border-gray-300 px-4" />

        <div className="flex gap-2">
          <Switch name="is_enabled" defaultChecked />
          <p className="text-sm">키워드 활성화</p>
        </div>
        <button type="submit" className="h-[40px] w-[100px] rounded-md bg-[#637BF4] text-white">
          추가
        </button>
      </form>
    </WidthWrapper>
  )
}

export default KeywordDetailPage
