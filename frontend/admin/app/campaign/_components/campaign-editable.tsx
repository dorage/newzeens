"use client"

import { CampaignResponse } from "@/app/_api/campaign.type"
import { Button } from "@/app/_components/ui/button"
import { Switch } from "@/app/_components/ui/switch"
import { cn } from "@/app/_lib/utils"
import dayjs from "dayjs"
import Link from "next/link"
import React, { useState } from "react"

interface CampaignEditableProps {
  campaign: CampaignResponse
}

const CampaignEditable = (props: CampaignEditableProps) => {
  const { campaign } = props

  const [isEdit, setIsEdit] = useState(false)
  const handleToggle = () => setIsEdit((prev) => !prev)

  const [editValues, setEditValues] = useState({
    name: campaign.name,
    description: campaign.description,
    comment: campaign.comment,
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditValues((prev) => ({ ...prev, [name]: value }))
  }

  if (isEdit) {
    return (
      <form action={() => {}} className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-10">
        <input type="hidden" value={campaign.id} name="groupId" />

        <label>
          <p className="font-semibold">제목</p>
          <input
            type="text"
            name="name"
            className="h-[40px] w-[300px] rounded-md border border-gray-300 px-4"
            value={editValues.name}
            onChange={handleChange}
          />
        </label>

        <label>
          <p className="font-semibold">설명</p>
          <input
            name="description"
            className="h-[40px] w-[600px] rounded-md border border-gray-300 px-4"
            value={editValues.description}
            onChange={handleChange}
          />
        </label>

        <label className="">
          <p className="font-semibold">메모(관리자용)</p>
          <textarea
            name="comment"
            className="h-[160px] w-[600px] rounded-md border border-gray-300 px-4"
            value={editValues.comment}
            onChange={handleChange}
          />
        </label>

        <label className="flex h-[140px] items-end gap-4">
          <button type="reset" className="h-[40px] w-[100px] rounded-md border bg-white" onClick={handleToggle}>
            취소
          </button>
          <button type="submit" className="h-[40px] w-[100px] rounded-md bg-[#637BF4] text-white">
            수정
          </button>
        </label>
      </form>
    )
  }

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_auto_auto] items-center gap-2 border-b border-gray-200 py-2">
      <Link href={`/campaign/${campaign.id}`}>
        <p className="text-lg hover:underline">{campaign.name}</p>
      </Link>

      <div
        className={cn("w-fit px-1.5 py-[2px] text-sm", {
          //   "bg-green-200": campaign.is_enabled,
          //   "bg-red-200": !campaign.is_enabled,
        })}
      >
        {/* {campaign.is_enabled ? "활성화" : "비활성화"} */}
        {campaign.description}
      </div>

      <div className="text-sm text-gray-500">{campaign.comment}</div>

      <div className="">등록일: {dayjs(campaign.created_at).format("YYYY.MM.DD")}</div>

      <div className="flex gap-2">
        <Button variant="outline" className="" onClick={handleToggle}>
          수정
        </Button>

        {/* 삭제 안되게! */}
        <form action={() => {}}>
          <input type="hidden" name="groupId" value={campaign.id} />
          <Button type="submit" variant="destructive" className="">
            삭제
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CampaignEditable
