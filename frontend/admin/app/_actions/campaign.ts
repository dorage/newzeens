"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import campaignApi from "../_api/campaign"
import campaignKey from "../_api/fetch-key/campaign"
import { redirect } from "next/navigation"
import { AdminArticleResponse } from "../_api/news-letter.type"

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

/**
 * 목록에서 하나씩 추가 / 제
 */
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

export const putSlotArticle = async (slotId: number, obj: { [key: string]: boolean }) => {
  "use server"

  await campaignApi.putAdminSlotArticle(slotId, obj)
  revalidateTag(campaignKey.slotList(slotId))
}

/**
 * 우선도 적용
 */
export const putSlotPublisherPreferences = async (formData: FormData, list: AdminArticleResponse[]) => {
  "use server"

  const slotId = Number(formData.get("slotId"))

  const reduce = list.reduce((acc, item) => {
    const preferences = formData.get(`${item.id}_preferences`)
    acc[item.id] = Number(preferences) || true

    return acc
  }, {} as Record<string, number | boolean>)

  try {
    await campaignApi.putAdminSlotArticle(slotId, reduce)
    revalidateTag(campaignKey.slotList(slotId))
  } catch (e) {
    console.log(e)
    throw new Error()
  }
}
