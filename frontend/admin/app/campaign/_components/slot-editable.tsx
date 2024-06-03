"use client"

import { deleteSlot, updateSlot } from "@/app/_actions/campaign"
import { CampaignSlotResponse } from "@/app/_api/campaign.type"
import { Button } from "@/app/_components/ui/button"
import { cn } from "@/app/_lib/utils"
import dayjs from "dayjs"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useState } from "react"

interface SlotEditableProps {
  slot: CampaignSlotResponse
}

const SlotEditable = (props: SlotEditableProps) => {
  const { slot } = props

  const { campaignId: _campaignId } = useParams()
  const campaignId = Number(_campaignId)
  const [isEdit, setIsEdit] = useState(false)
  const handleToggle = () => setIsEdit((prev) => !prev)

  const [editValues, setEditValues] = useState({
    name: slot.name,
    description: slot.description,
    comment: slot.comment,
    preferences: slot.preferences,
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditValues((prev) => ({ ...prev, [name]: value }))
  }
  if (isEdit) {
    return (
      <form action={updateSlot} className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-10">
        <input type="hidden" value={campaignId} name="campaignId" />
        <input type="hidden" value={slot.id} name="slotId" />

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
            className="h-[160px] w-[600px] rounded-md border border-gray-300 p-4"
            value={editValues.comment}
            onChange={handleChange}
          />
        </label>

        <label>
          <p className="font-semibold">preferences</p>
          <input
            type="number"
            name="preferences"
            className="h-[40px] w-[300px] rounded-md border border-gray-300 px-4"
            value={slot.preferences}
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
    <div className="grid grid-cols-6 items-center gap-2 border-b border-gray-200 py-2">
      <Link href={`/campaign/${campaignId}/${slot.id}`}>
        <p className="text-lg hover:underline">{slot.name}</p>
      </Link>

      <div className="">preferences: {slot.preferences}</div>

      <div>{slot.description}</div>
      <div className="text-sm text-gray-500">{slot.comment}</div>

      <div
        className={cn("w-fit px-1.5 py-[2px] text-sm", {
          "bg-green-200": slot.is_enabled,
          "bg-red-200": !slot.is_enabled,
        })}
      >
        {slot.is_enabled ? "활성화" : "비활성화"}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="" onClick={handleToggle}>
          수정
        </Button>

        <form action={deleteSlot}>
          <input type="hidden" name="campaignId" value={campaignId} />
          <input type="hidden" name="slotId" value={slot.id} />
          <Button type="submit" variant="destructive" className="">
            삭제
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SlotEditable
