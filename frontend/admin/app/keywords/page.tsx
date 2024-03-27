import React from "react"
import Link from "next/link"
import keywordApi from "@/app/_api/keyword"
import { Button } from "@/app/_components/ui/button"

import KeywordGroupEditable from "./keyword-group-editable"
import WidthWrapper from "../_components/layout/width-wrapper"

const KeywordsPage = async () => {
  const groupList = await keywordApi.getAdminKeywordGroup()

  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">
          키워드 관리 <span className="text-[#2141E5]">{groupList?.length}</span>
        </h1>

        <Link href="/keyword/create">
          <Button className="">등록</Button>
        </Link>
      </div>

      <div className="h-12" />
      {groupList?.map((keywordGroup) => {
        return <KeywordGroupEditable key={keywordGroup.id} keywordGroup={keywordGroup} />
      })}
    </WidthWrapper>
  )
}

export default KeywordsPage
