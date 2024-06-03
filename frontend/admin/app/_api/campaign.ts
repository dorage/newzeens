import { CampaignResponse, CampaignSlotResponse, PostCampaignPayload, PostCampaignSlotPayload } from "./campaign.type"
import { METHOD } from "./constants"
import api from "./fetch"
import campaignKey from "./fetch-key/campaign"

const campaignApi = {
  /**
   * campaign 목록 가져오기
   */
  getAdminCampaign: async () => {
    const data = await api(`/admin/campaign`, {
      next: { tags: [campaignKey.list()] },
    })
    return data as CampaignResponse[]
  },

  /**
   * campaign 추가
   */
  postAdminCampaign: async (payload: PostCampaignPayload) => {
    const data = await api(`/admin/campaign`, {
      method: METHOD.POST,
      data: payload,
    })
    return data
  },

  /**
   * campaign 정보 수정
   */
  putAdminCampaign: async (id: number, payload: PostCampaignPayload) => {
    const data = await api(`/admin/campaign/${id}`, {
      method: METHOD.PUT,
      data: payload,
    })
    return data
  },

  /**
   * campaign 정보 삭제
   */
  deleteAdminCampaign: async (id: number) => {
    const { data } = await api(`/admin/campaign/${id}`, {
      method: METHOD.DELETE,
    })
    return data
  },

  /**
   * campaign의 slot 목록 가져오기
   */
  getAdminCampaignSlot: async (id: number) => {
    const data = await api(`/admin/campaign/${id}/slot`, {
      next: { tags: [campaignKey.slotList(id)] },
    })
    return data as CampaignSlotResponse[]
  },

  /**
   * campaign의 slot 추가하기
   */
  postAdminCampaignSlot: async (id: number, payload: PostCampaignSlotPayload) => {
    const data = await api(`/admin/campaign/${id}/slot`, {
      method: METHOD.POST,
      data: payload,
    })
    return data
  },

  /**
   * slot 정보 수정하기
   */
  putAdminCampaignSlot: async (id: number, slotId: number, payload: PostCampaignSlotPayload) => {
    const data = await api(`/admin/campaign/${id}/slot/${slotId}`, {
      method: METHOD.PUT,
      data: payload,
    })
    return data
  },

  /**
   * slot 정보 삭제하기
   */
  deleteAdminCampaignSlot: async (id: number, slotId: number) => {
    const { data } = await api(`/admin/campaign/${id}/slot/${slotId}`, {
      method: METHOD.DELETE,
    })
    return data
  },

  /**
   * slot의 article 목록 가져오기
   */
  getAdminCampaignSlotArticle: async (id: number, slotId: number) => {
    const data = await api(`/admin/campaign/${id}/slot/${slotId}/article`, {
      next: { tags: [campaignKey.slotList(id)] },
    })
    return data
  },

  /**
   * slot의 article 추가
   */
  postAdminCampaignSlotArticle: async (id: number, slotId: number, payload: { article_id: number }) => {
    const { data } = await api(`/admin/campaign/${id}/slot/${slotId}/article`, {
      method: METHOD.POST,
      data: payload,
    })
    return data
  },

  /**
   * slot의 article 삭제
   */
  deleteAdminCampaignSlotArticle: async (id: number, slotId: number, payload: { article_id: number }) => {
    const { data } = await api(`/admin/campaign/${id}/slot/${slotId}/article`, {
      method: METHOD.DELETE,
      data: payload,
    })
    return data
  },

  /**
   * slot의 publisher 목록 가져오기
   */
  getAdminCampaignSlotPublisher: async (id: number, slotId: number) => {
    const data = await api(`/admin/campaign/${id}/slot/${slotId}/publisher`, {
      next: { tags: [campaignKey.slotList(id)] },
    })
    return data
  },

  /**
   * slot에 publisher 추가
   */
  postAdminCampaignSlotPublisher: async (id: number, slotId: number, payload: { publisher_id: string }) => {
    const { data } = await api(`/admin/campaign/${id}/slot/${slotId}/publisher`, {
      method: METHOD.POST,
      data: payload,
    })
    return data
  },

  /**
   * slot의 publisher 삭제
   */
  deleteAdminCampaignSlotPublisher: async (id: number, slotId: number, payload: { publisher_id: string }) => {
    const { data } = await api(`/admin/campaign/${id}/slot/${slotId}/publisher`, {
      method: METHOD.DELETE,
      data: payload,
    })
    return data
  },
}

export default campaignApi
