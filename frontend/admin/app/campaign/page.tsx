import React from "react"
import WidthWrapper from "../_components/layout/width-wrapper"
import Link from "next/link"
import { Button } from "../_components/ui/button"
import campaignApi from "../_api/campaign"
import CampaignEditable from "./_components/campaign-editable"

const CampaignPage = async () => {
  const groupList = await campaignApi.getAdminCampaign()

  return (
    <WidthWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">
          캠페인 관리 <span className="text-[#2141E5]">{groupList?.length}</span>
        </h1>

        <Link href="/campaign/create">
          <Button className="">등록</Button>
        </Link>
      </div>

      <div className="h-10" />

      {groupList?.map((campaign) => {
        return <CampaignEditable key={campaign.id} campaign={campaign} />
      })}
    </WidthWrapper>
  )
}

export default CampaignPage
