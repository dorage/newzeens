"use client"

import React, { useState } from "react"
import dayjs from "dayjs"
import { deleteKeyword, putKeyword } from "@/app/_actions"
import { AdminKeywordResponse } from "@/app/_api/keyword.type"
import { Button } from "@/app/_components/ui/button"
import { Switch } from "@/app/_components/ui/switch"
import { cn } from "@/app/_lib/utils"

interface KeywordEditableProps {
  keyword: AdminKeywordResponse
}

const KeywordEditable = (props: KeywordEditableProps) => {
  const { keyword } = props

  const [isEdit, setIsEdit] = useState(false)
  const handleToggle = () => setIsEdit((prev) => !prev)

  const [editValues, setEditValues] = useState({
    keyword_name: keyword.name,
    is_enabled: keyword.is_enabled,
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditValues((prev) => ({ ...prev, [name]: value }))
  }

  const bind = deleteKeyword.bind(null, keyword.id)

  if (isEdit) {
    return (
      <form
        action={(formData) => {
          putKeyword(keyword.id, formData)
        }}
        className="flex flex-wrap items-center gap-4"
      >
        <input
          type="text"
          name="keyword_name"
          className="h-[40px] w-[300px] rounded-md border border-gray-300 px-4"
          value={editValues.keyword_name}
          onChange={handleChange}
        />

        <div className="flex gap-2">
          <Switch
            onClick={() => {
              setEditValues((prev) => ({ ...prev, is_enabled: !prev.is_enabled }))
            }}
            name="is_enabled"
            checked={editValues.is_enabled}
          />
          <p className="text-sm">키워드그룹 활성화</p>
        </div>
        <button type="reset" className="h-[40px] w-[100px] rounded-md bg-white" onClick={handleToggle}>
          취소
        </button>
        <button type="submit" className="h-[40px] w-[100px] rounded-md bg-[#637BF4] text-white">
          수정
        </button>
      </form>
    )
  }

  return (
    <div key={keyword.id} className="grid grid-cols-4 items-center gap-2 border-b border-gray-200 py-2">
      <p className="text-lg">{keyword.name}</p>

      <div
        className={cn("w-fit px-1.5 py-[2px] text-sm", {
          "bg-green-200": keyword.is_enabled,
          "bg-red-200": !keyword.is_enabled,
        })}
      >
        {keyword.is_enabled ? "활성화" : "비활성화"}
      </div>

      <div className="">등록일: {dayjs(keyword.created_at).format("YYYY.MM.DD")}</div>

      <div className="flex gap-2">
        <Button variant="outline" className="" onClick={handleToggle}>
          수정
        </Button>

        <form action={bind}>
          <input type="hidden" name="keywordId" value={keyword.id} />
          <Button type="submit" variant="destructive" className="">
            삭제
          </Button>
        </form>
      </div>
    </div>
  )
}

export default KeywordEditable
