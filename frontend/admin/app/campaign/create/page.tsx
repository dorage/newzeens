import { create } from "@/app/_actions/campaign"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import React from "react"

interface CampaignCreatePageProps {}

const CampaignCreatePage = async (props: CampaignCreatePageProps) => {
  const {} = props
  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">캠페인 추가</h1>
      </div>

      <div className="h-12" />

      <form action={create} className="flex flex-col items-center gap-4">
        <label className="w-full">
          <p className="font-semibold">제목</p>
          <input
            type="text"
            name="name"
            className="h-[40px] w-full max-w-[400px] rounded-md border border-gray-300 px-4"
          />
        </label>

        <label className="w-full">
          <p className="font-semibold">설명</p>
          <input type="text" name="description" className="h-[40px] w-full rounded-md border border-gray-300 px-4" />
        </label>

        <label className="w-full">
          <p className="font-semibold">관리자 메모</p>
          <textarea name="comment" className="w-full rounded-md border border-gray-300 p-4" rows={6} />
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

export default CampaignCreatePage
