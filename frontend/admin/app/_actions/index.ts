"use server"

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import keywordKey from "../_api/fetch-key/keyword"
import newsLetterKey from "../_api/fetch-key/news-letter"
import keywordApi from "../_api/keyword"
import newsLetterApi from "../_api/news-letter"
import articleApi from "../_api/article"
import articleKey from "../_api/fetch-key/article"

/**
 * 키워드 그룹생성
 */
export const createKeywordGroup = async (formData: FormData) => {
  "use server"
  const payload = {
    name: formData.get("groupName") as string,
    is_enabled: formData.get("is_enabled") === "on" ? true : false,
  }
  const result = await keywordApi.postAdminKeywordGroup(payload)
  revalidateTag(keywordKey.list())
  redirect(`/keyword/${result[result.length - 1].id}`)
}

/**
 * 키워드 그룹삭제
 */
export const deleteKeywordGroup = async (formData: FormData) => {
  "use server"
  const groupId = Number(formData.get("groupId"))
  await keywordApi.deleteAdminKeywordGroup(groupId)
  revalidateTag(keywordKey.list())
}

/**
 * keyword-group 의 이름, 활성화 수정
 */
export const putKeywordGroup = async (formData: FormData) => {
  "use server"
  const groupId = Number(formData.get("groupId"))
  const payload = {
    name: formData.get("name") as string,
    is_enabled: formData.get("is_enabled") === "on" ? true : false,
  }
  await keywordApi.putAdminKeywordGroup(groupId, payload)
  revalidateTag(keywordKey.list())
}

/**
 * 키워드 추가
 */
export const createKeyword = async (groupId: number, formData: FormData) => {
  "use server"
  const payload = {
    name: formData.get("keyword_name") as string,
    is_enabled: formData.get("is_enabled") === "on" ? true : false,
  }

  await keywordApi.postAdminKeyword({ groupId, payload })
}

/**
 * 키워드 수정
 */
export const putKeyword = async (groupId: number, formData: FormData) => {
  "use server"
  const keywordId = Number(formData.get("keyword_id")) as number
  const payload = {
    name: formData.get("keyword_name") as string,
    is_enabled: formData.get("is_enabled") === "on" ? true : false,
  }
  await keywordApi.putAdminKeyword({ groupId, keywordId, payload })
  revalidateTag(keywordKey.detail(groupId))
}

/**
 * 키워드 삭제
 */
export const deleteKeyword = async (groupId: number, formData: FormData) => {
  "use server"

  const keywordId = Number(formData.get("keywordId"))
  await keywordApi.deleteAdminKeyword({ groupId, keywordId })
  revalidateTag(keywordKey.detail(groupId))
}

/** ------------------------------------------------------------------------------
 * 
 * 퍼블리셔
 * 
 ------------------------------------------------------------------------------ */
/**
 * 퍼블리셔 수정
 */
export const putPublisher = async (formData: FormData) => {
  "use server"
  // const payload: AdminPublisherPayload = {
  const payload = {
    name: "",
    description: "",
    subscriber: 0,
    thumbnail: "",
    url_subscribe: "",
    publisher_main: "",
    publisher_spec: "",
    is_enabled: false,
  } as any

  formData.forEach((value, key) => {
    if (key === "publisherId") {
    } else {
      payload[key] = value
    }
  })

  await newsLetterApi.putAdminPublisher(formData.get("publisherId") as string, payload)
  // revalidatePath("/news-letter/[publisherId]", "page")
  revalidateTag(newsLetterKey.publisherDetail(formData.get("publisherId") as string))

  return {
    status: "success",
  }
}

/**
 * 퍼블리셔 키워드 수정 (not formData)
 */
export const putPublisherKeyword = async (
  publisherId: string,
  {
    keywordGroupId,
    keywordId,
  }: {
    keywordGroupId: number
    keywordId: number
  },
) => {
  "use server"

  const payload = {
    keyword_group_id: keywordGroupId,
    keyword_id: keywordId,
  }

  await newsLetterApi.putAdminPublisherKeyword(publisherId, payload)
  // revalidatePath(`/news-letter/[publisherId]`, "page")
}

/** ------------------------------------------------------------------------------
 * 
 * 아티클
 * 
 ------------------------------------------------------------------------------ */
export const putArticle = async (formData: FormData) => {
  "use server"
  const id = formData.get("articleId") as string

  const payload = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    is_enabled: formData.get("is_enabled") === "on" ? true : false,
  }
  console.log(`payload`, payload)

  await articleApi.putAdminArticle({ id, payload })
  revalidateTag(articleKey.detail(id))
}
