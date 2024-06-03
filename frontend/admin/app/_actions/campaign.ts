"use server"

import { revalidatePath, revalidateTag } from "next/cache"
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
  revalidatePath("/campaign")
}

export const deleteCampaign = async (formData: FormData) => {
  "use server"
  const campaignId = Number(formData.get("id"))
  await campaignApi.deleteAdminCampaign(campaignId)
  revalidateTag(campaignKey.list())
}

export const createSlot = async (formData: FormData) => {
  "use server"
  const campaignId = Number(formData.get("campaignId"))
  const payload = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    comment: formData.get("comment") as string,
    preferences: Number(formData.get("preferences")),
  }
  await campaignApi.postAdminCampaignSlot(campaignId, payload)
  redirect(`/campaign/${campaignId}`)
}

export const updateSlot = async (formData: FormData) => {
  "use server"
  const campaignId = Number(formData.get("campaignId"))
  const slotId = Number(formData.get("slotId"))
  const payload = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    comment: formData.get("comment") as string,
    preferences: Number(formData.get("preferences")),
  }
  await campaignApi.putAdminCampaignSlot(campaignId, slotId, payload)
  revalidatePath("/campaign")
}

export const deleteSlot = async (formData: FormData) => {
  "use server"
  const campaignId = Number(formData.get("campaignId"))
  const slotId = Number(formData.get("slotId"))
  await campaignApi.deleteAdminCampaignSlot(campaignId, slotId)
  revalidatePath("/campaign")
}

export const addPublisher = async () => {
  "use server"
}
