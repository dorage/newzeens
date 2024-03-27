import React from "react"
import { createKeywordGroup } from "@/app/_actions"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { Switch } from "@/app/_components/ui/switch"

const KeywordCreatePage = async () => {
  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">키워드그룹 추가</h1>
      </div>

      <div className="h-12" />

      <form action={createKeywordGroup} className="flex flex-wrap items-center gap-4">
        <input type="text" name="groupName" className="h-[40px] w-[300px] rounded-md border border-gray-300 px-4" />

        <div className="flex gap-2">
          <Switch name="is_enabled" />
          <p className="text-sm">키워드그룹 활성화</p>
        </div>
        <button type="submit" className="h-[40px] w-[100px] rounded-md bg-[#637BF4] text-white">
          추가
        </button>
      </form>
    </WidthWrapper>
  )
}

export default KeywordCreatePage
