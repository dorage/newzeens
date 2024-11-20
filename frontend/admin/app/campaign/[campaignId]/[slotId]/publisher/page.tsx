import React from "react"
import { IdContextProvider } from "../_context/id-context"
import { NextPageProps } from "@/app/_types/next"
import campaignApi from "@/app/_api/campaign"
import { SlotPublisherContextProvider } from "../_context/slot-publisher-context"
import PublisherAdd from "../_components/publisher-add"
import newsLetterApi from "@/app/_api/news-letter"

interface SlotPublisherFormPageProps {
  campaignId: string
  slotId: string
}

const SlotPublisherFormPage = async (props: NextPageProps<SlotPublisherFormPageProps>) => {
  const { params } = props
  const campaignId = Number(params.campaignId)
  const slotId = Number(params.slotId)

  const publisher = await campaignApi.getAdminCampaignSlotPublisher(slotId)
  const publisherList = await newsLetterApi.getAdminPublisherList({ page: 0, is_enabled: true })

  return (
    <IdContextProvider campaignId={campaignId} slotId={slotId}>
      <SlotPublisherContextProvider initialValues={publisher}>
        <PublisherAdd initialData={publisherList} />
      </SlotPublisherContextProvider>
    </IdContextProvider>
  )
}

export default SlotPublisherFormPage
