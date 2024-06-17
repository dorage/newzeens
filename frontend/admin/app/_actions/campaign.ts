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
    is_enabled: Boolean(formData.get("is_enabled")),
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
    is_enabled: Boolean(formData.get("is_enabled")),
  }
  await campaignApi.putAdminCampaignSlot(slotId, payload)
  revalidatePath("/campaign/[campaignId]", "page")
}

export const deleteSlot = async (formData: FormData) => {
  "use server"
  const campaignId = Number(formData.get("campaignId"))
  const slotId = Number(formData.get("slotId"))
  await campaignApi.deleteAdminCampaignSlot(campaignId, slotId)
  revalidatePath("/campaign")
}

export const putSlotPublisher = async (formData: FormData, selectList: any[]) => {
  "use server"
  const slotId = Number(formData.get("slotId"))

  const reduce = selectList.reduce((acc, item) => {
    // TODO: 더 쉽게 하는 방법이 없나..
    const isDelete = !!item.is_to_be_deleted
    if (isDelete) {
      acc[item.id] = false
    } else {
      const preferences = formData.get(`${item.id}_preferences`)
      acc[item.id] = Number(preferences) || true
    }

    return acc
  }, {} as Record<string, boolean>)

  await campaignApi.putAdminSlotPublisher(slotId, reduce)

  revalidateTag(campaignKey.slotList(slotId))
}
