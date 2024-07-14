import api from "./fetch"
import newsLetterKey from "./fetch-key/news-letter"
import { AdminKeywordResponse } from "./keyword.type"
import {
  AdminArticleResponse,
  AdminNewsLetterResponse,
  AdminPublisherIdKeywordPayload,
  AdminPublisherParams,
  AdminPublisherPayload,
} from "./news-letter.type"
import { queryString } from "../_utils/query-string"
import { METHOD } from "./constants"

const newsLetterApi = {
  /** ------------------------------------------------------------------------------
   * 
   * publisher
   * 
   ------------------------------------------------------------------------------ */
  /**
   * publisher 목록 가져오기
   */
  getAdminPublisherList: async (params: AdminPublisherParams) => {
    const data = await api(`/admin/publisher?${queryString(params)}`, {
      next: { tags: [newsLetterKey.publisher()] },
    })
    return data as AdminNewsLetterResponse[]
  },

  /**
   * publisher 추가
   */
  postAdminPublisher: async (payload: AdminPublisherPayload) => {
    const data = await api("/admin/publisher", {
      method: METHOD.POST,
      data: payload,
    })
    return data
  },

  /**
   * publisher 정보 가져오기
   */
  getAdminPublisher: async (id: string) => {
    const data = await api(`/admin/publisher/${id}`, {
      next: { tags: [newsLetterKey.publisherDetail(id)] },
    })
    return data as AdminNewsLetterResponse
  },

  /**
   * publisher 정보 삭제
   */
  deleteAdminPublisher: async (id: string) => {
    const data = await api(`/admin/publisher/${id}`, {
      method: METHOD.DELETE,
    })
    return data
  },

  /**
   * publisher 정보 수정
   */
  putAdminPublisher: async (id: string, payload: AdminPublisherPayload) => {
    const data = await api(`/admin/publisher/${id}`, {
      method: METHOD.PUT,
      data: payload,
    })
    return data
  },

  /**
   * publisher 의 keyword 가져오기
   */
  getAdminPublisherKeyword: async (id: string) => {
    const data = await api(`/admin/publisher/${id}/keyword`)
    return data as AdminKeywordResponse[]
  },
  /**
   * publisher 에 keyword 가 없으면 추가/있으면 수정/null은 삭제
   */
  putAdminPublisherKeyword: async (id: string, payload: AdminPublisherIdKeywordPayload) => {
    const data = await api(`/admin/publisher/${id}/keyword`, {
      method: METHOD.PUT,
      data: payload,
    })
    return data
  },

  /**
   * 업로드 publisher 썸네일
   */
  postAdminPublisherUpload: async ({ id, file }: { id: string; file: any }) => {
    const data = await api(`/admin/publisher/${id}/upload`, {
      method: METHOD.POST,
      data: file,
    })
    return data
  },

  /** ------------------------------------------------------------------------------
   * 
   * 아티클
   * 
   ------------------------------------------------------------------------------ */
  /**
   * article 목록 가져오기
   */
  getAdminArticleList: async (params: AdminPublisherParams) => {
    const data = await api(`/admin/article?${queryString(params)}`, {
      next: { tags: [newsLetterKey.article()] },
    })
    return data as AdminArticleResponse[]
  },
}

export default newsLetterApi
