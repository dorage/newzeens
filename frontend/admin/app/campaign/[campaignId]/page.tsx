import campaignApi from "@/app/_api/campaign"
import WidthWrapper from "@/app/_components/layout/width-wrapper"
import { NextPageProps } from "@/app/_types/next"
import { useParams } from "next/navigation"
import React from "react"
import SlotEditable from "../_components/slot-editable"
import { Button } from "@/app/_components/ui/button"
import Link from "next/link"

interface CampaignDetailPageProps {
  campaignId: string
}

const CampaignDetailPage = async (props: NextPageProps<CampaignDetailPageProps>) => {
  const { params } = props

  const { campaignId: _campaignId } = params
  const campaignId = Number(_campaignId)

  const groupList = await campaignApi.getAdminCampaign()
  const currentCampaign = groupList.find((campaign) => campaign.id === campaignId)
  const slots = await campaignApi.getAdminCampaignSlot(campaignId)

  return (
    <WidthWrapper>
      <div className="flex justify-between">
        <h1 className="text-[30px] font-bold">
          슬롯 관리 <span className="text-[#2141E5]">{slots?.length}</span>
        </h1>

        <Button variant="default" className="" type="button">
          <Link href={`/campaign/${campaignId}/create`}>슬롯 추가</Link>
        </Button>
      </div>

      <div className="px-5 pt-6">
        <strong>{currentCampaign?.name}</strong> - {currentCampaign?.description} -{" "}
        <span className="text-gray-600">{currentCampaign?.comment}</span>
      </div>

      <div>
        <div className="h-6" />

        <div className="grid grid-cols-6 items-center gap-2 border-b border-gray-200 bg-gray-50 py-2">
          <div>name</div>
          <div>preferences</div>
          <div>description</div>
          <div>memo</div>
          <div>is_enabled</div>
        </div>

        {slots.map((slot) => {
          return <SlotEditable key={slot.id} slot={slot} />
        })}
      </div>
    </WidthWrapper>
  )
}

export default CampaignDetailPage
