import { create, createSlot } from "@/app/_actions/campaign"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { Switch } from "@/app/_components/ui/switch"
import { NextPageProps } from "@/app/_types/next"
import { useParams } from "next/navigation"
import React from "react"

interface SlotCreatePageProps {
  campaignId: string
}

const SlotCreatePage = async (props: NextPageProps<SlotCreatePageProps>) => {
  const { params } = props
  const campaignId = Number(params.campaignId)

  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">슬롯 추가</h1>
      </div>

      <div className="h-12" />

      <form action={createSlot} className="flex flex-col items-center gap-4">
        <input type="hidden" value={campaignId} name="campaignId" />

        <div className="flex w-full items-center gap-10">
          <label className="flex-1">
            <p className="font-semibold">제목</p>
            <input
              type="text"
              name="name"
              className="h-[40px] w-full max-w-[400px] rounded-md border border-gray-300 px-4"
            />
          </label>

          <label className="flex flex-1">
            <Switch name="is_enabled" />
            <p className="text-sm">슬롯 활성화</p>
          </label>
        </div>

        <label className="w-full">
          <p className="font-semibold">설명</p>
          <input type="text" name="description" className="h-[40px] w-full rounded-md border border-gray-300 px-4" />
        </label>

        <label className="w-full">
          <p className="font-semibold">관리자 메모</p>
          <textarea name="comment" className="w-full rounded-md border border-gray-300 p-4" rows={6} />
        </label>

        <label className="w-full">
          <p className="font-semibold">preferences</p>
          <input name="preferences" className="w-full rounded-md border border-gray-300 p-4" />
        </label>

        <div className="flex w-full justify-end">
          <button type="submit" className="h-[40px] w-[100px] rounded-md bg-[#637BF4] text-white">
            추가
          </button>
        </div>
      </form>
    </WidthWrapper>
  )
}

export default SlotCreatePage
