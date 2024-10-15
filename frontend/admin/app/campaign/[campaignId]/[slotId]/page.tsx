import campaignApi from "@/app/_api/campaign"
import { NextPageProps } from "@/app/_types/next"
import React from "react"

import Link from "next/link"
import { Card } from "@/app/_components/ui/card"
import BackButton from "@/app/_components/layout/back-button"

interface CampaignSlotPageProps {
  campaignId: string
  slotId: string
}

const CampaignSlotPage = async (props: NextPageProps<CampaignSlotPageProps>) => {
  const { params } = props
  const campaignId = Number(params.campaignId)
  const slotId = Number(params.slotId)

  const slotList = await campaignApi.getAdminCampaignSlot(campaignId)

  const currentSlot = slotList.find((slot) => slot.id === slotId)

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#E0E5F7]">
      <div className="h-20" />
      <div className="relative w-full">
        <BackButton className="absolute left-4" />
        <h1 className="text-center text-[30px] font-bold">{currentSlot?.name}</h1>
      </div>
      <p className="">{currentSlot?.description}</p>
      <p className="">{currentSlot?.comment}</p>
      <div className="h-20" />

      <div className="flex w-full max-w-screen-lg flex-col gap-4">
        <Link href={`/campaign/${campaignId}/${slotId}/publisher`}>
          <Card className="w-full cursor-pointer p-10 hover:bg-gray-100">뉴스레터용 캠페인</Card>
        </Link>

        <Link href={`/campaign/${campaignId}/${slotId}/article`}>
          <Card className="w-full cursor-pointer p-10 hover:bg-gray-100">아티클용 캠페인</Card>
        </Link>
      </div>
    </div>

    // <IdContextProvider campaignId={campaignId} slotId={slotId}>
    //   <>11</>

    //   {/* <SlotPublisherContextProvider initialValues={publisher}>
    //     <PublisherAdd />
    //   </SlotPublisherContextProvider> */}
    // </IdContextProvider>
  )
}

export default CampaignSlotPage
