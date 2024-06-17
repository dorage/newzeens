import React from "react"
import { IdContextProvider } from "../_context/id-context"
import { NextPageProps } from "@/app/_types/next"
import campaignApi from "@/app/_api/campaign"
import { SlotPublisherContextProvider } from "../_context/slot-publisher-context"
import PublisherAdd from "../_components/publisher-add"

interface SlotPublisherFormPageProps {
  campaignId: string
  slotId: string
}

const SlotPublisherFormPage = async (props: NextPageProps<SlotPublisherFormPageProps>) => {
  const { params } = props
  const campaignId = Number(params.campaignId)
  const slotId = Number(params.slotId)

  const publisher = await campaignApi.getAdminCampaignSlotPublisher(slotId)

  return (
    <IdContextProvider campaignId={campaignId} slotId={slotId}>
      <SlotPublisherContextProvider initialValues={publisher}>
        <PublisherAdd />
      </SlotPublisherContextProvider>
    </IdContextProvider>
  )
}

export default SlotPublisherFormPage
