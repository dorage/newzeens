"use client"

import React, { useState } from "react"
import dayjs from "dayjs"
import Link from "next/link"
import { deleteKeywordGroup, putKeywordGroup } from "@/app/_actions"
import { AdminKeywordGroupResponse } from "@/app/_api/keyword.type"
import { Button } from "@/app/_components/ui/button"
import { Switch } from "@/app/_components/ui/switch"
import { cn } from "@/app/_lib/utils"

interface KeywordGroupEditableProps {
  keywordGroup: AdminKeywordGroupResponse
}

const KeywordGroupEditable = (props: KeywordGroupEditableProps) => {
  const { keywordGroup } = props

  const [isEdit, setIsEdit] = useState(false)
  const handleToggle = () => setIsEdit((prev) => !prev)

  const [editValues, setEditValues] = useState({
    name: keywordGroup.name,
    is_enabled: keywordGroup.is_enabled,
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditValues((prev) => ({ ...prev, [name]: value }))
  }

  if (isEdit) {
    return (
      <form action={putKeywordGroup} className="flex flex-wrap items-center gap-4">
        <input type="hidden" value={keywordGroup.id} name="groupId" />
        <input
          type="text"
          name="name"
          className="h-[40px] w-[300px] rounded-md border border-gray-300 px-4"
          value={editValues.name}
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
    <div className="grid grid-cols-4 items-center gap-2 border-b border-gray-200 py-2">
      <Link href={`/keyword/${keywordGroup.id}`}>
        <p className="text-lg hover:underline">{keywordGroup.name}</p>
      </Link>

      <div
        className={cn("w-fit px-1.5 py-[2px] text-sm", {
          "bg-green-200": keywordGroup.is_enabled,
          "bg-red-200": !keywordGroup.is_enabled,
        })}
      >
        {keywordGroup.is_enabled ? "활성화" : "비활성화"}
      </div>

      <div className="">등록일: {dayjs(keywordGroup.created_at).format("YYYY.MM.DD")}</div>

      <div className="flex gap-2">
        <Button variant="outline" className="" onClick={handleToggle}>
          수정
        </Button>

        <form action={deleteKeywordGroup}>
          <input type="hidden" name="groupId" value={keywordGroup.id} />
          <Button type="submit" variant="destructive" className="">
            삭제
          </Button>
        </form>
      </div>
    </div>
  )
}

export default KeywordGroupEditable
