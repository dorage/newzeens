import api, { METHOD } from "./fetch"
import keywordKey from "./fetch-key/keyword"
import {
  AdminKeywordGroupResponse,
  AdminKeywordPostPayload,
  AdminKeywordPutPayload,
  AdminKeywordResponse,
} from "./keyword.type"

const keywordApi = {
  /**
   * keyword-group 목록 가져오기
   */
  getAdminKeywordGroup: async () => {
    const data = await api(`/admin/keyword-group`, {
      next: { tags: [keywordKey.list()] },
    })
    return data as AdminKeywordGroupResponse[]
  },

  /**
   * keyword-group 추가
   */
  postAdminKeywordGroup: async (payload: { name: string; is_enabled: boolean }) => {
    const data = await api(`/admin/keyword-group`, {
      method: METHOD.POST,
      data: payload,
    })
    return data
  },

  /**
   * keyword-group 의 정보를 삭제
   */
  deleteAdminKeywordGroup: async (id: number) => {
    const { data } = await api(`/admin/keyword-group/${id}`, {
      method: METHOD.DELETE,
      next: { tags: [keywordKey.list()] },
    })
    return data
  },

  /**
   * keyword-group 의 이름, 활성화 수정
   */
  putAdminKeywordGroup: async (id: number, payload: { name: string; is_enabled: boolean }) => {
    const { data } = await api(`/admin/keyword-group/${id}`, {
      method: METHOD.PUT,
      data: payload,
      next: { tags: [keywordKey.list()] },
    })
    return data
  },

  /**
   * keyword 목록 가져오기
   */
  getAdminKeyword: async (groupId: number) => {
    const data = await api(`/admin/keyword-group/${groupId}/keyword`, {
      next: { tags: [keywordKey.detail(groupId)] },
    })
    return data as AdminKeywordResponse[]
  },

  /**
   * keyword 추가
   */
  postAdminKeyword: async ({ groupId, payload }: AdminKeywordPostPayload) => {
    const data = await api(`/admin/keyword-group/${groupId}/keyword`, {
      method: METHOD.POST,
      data: payload,
    })
    return data
  },

  /**
   * keyword 의 정보를 삭제
   */
  deleteAdminKeyword: async ({ groupId, keywordId }: { groupId: number; keywordId: number }) => {
    const { data } = await api(`/admin/keyword-group/${groupId}/keyword/${keywordId}`, {
      method: METHOD.DELETE,
    })
    return data
  },

  /**
   * keyword 의 이름, 활성화 수정
   */
  putAdminKeyword: async ({ groupId, keywordId, payload }: AdminKeywordPutPayload) => {
    const { data } = await api(`/admin/keyword-group/${groupId}/keyword/${keywordId}`, {
      method: METHOD.PUT,
      data: payload,
    })
    return data
  },
}

export default keywordApi
