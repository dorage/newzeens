"use server"

import { revalidateTag } from "next/cache"
import campaignApi from "../_api/campaign"
import campaignKey from "../_api/fetch-key/campaign"
import { redirect } from "next/navigation"

export const create = async (formData: FormData) => {
  "use server"
  const payload = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    comment: formData.get("comment") as string,
  }
  await campaignApi.postAdminCampaign(payload)
  redirect(`/campaign`)
}

export const update = async (formData: FormData) => {
  "use server"
  const campaignId = Number(formData.get("campaignId"))
  const payload = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    comment: formData.get("comment") as string,
  }
  await campaignApi.putAdminCampaign(campaignId, payload)
  revalidateTag(campaignKey.detail(campaignId))
}
