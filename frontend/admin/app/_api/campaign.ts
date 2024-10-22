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
    const data = await api(`/admin/slot`, {
      params: { campaign_id: id },
      next: { tags: [campaignKey.slotList(id)] },
    })
    return data as CampaignSlotResponse[]
  },

  /**
   * campaign의 slot 추가하기
   */
  postAdminCampaignSlot: async (id: number, payload: PostCampaignSlotPayload) => {
    const data = await api(`/admin/slot`, {
      params: { campaign_id: id },
      method: METHOD.POST,
      data: payload,
    })
    return data
  },

  /**
   * slot 정보 수정하기
   */
  putAdminCampaignSlot: async (slotId: number, payload: PostCampaignSlotPayload) => {
    const data = await api(`/admin/slot/${slotId}`, {
      method: METHOD.PUT,
      data: payload,
    })
    return data
  },

  /**
   * slot 정보 삭제하기
   */
  deleteAdminCampaignSlot: async (slotId: number) => {
    const { data } = await api(`/admin/slot/${slotId}`, {
      method: METHOD.DELETE,
    })
    return data
  },

  /**
   * slot의 article 목록 가져오기
   */
  getAdminCampaignSlotArticle: async (slotId: number) => {
    const data = await api(`/admin/slot/${slotId}/article`, {
      next: { tags: [campaignKey.slotList(slotId)] },
    })
    return data
  },

  /**
   * slot에 article 추가/삭제
   */
  putAdminSlotArticle: async (slotId: number, payload: { [key: string]: number | boolean | null }) => {
    const { data } = await api(`/admin/slot/${slotId}/article`, {
      method: METHOD.PUT,
      data: payload,
    })
    return data
  },

  /**
   * slot의 publisher 목록 가져오기
   */
  getAdminCampaignSlotPublisher: async (slotId: number) => {
    const data = await api(`/admin/slot/${slotId}/publisher`, {
      next: { tags: [campaignKey.slotList(slotId)] },
    })
    return data
  },

  /**
   * slot에 publisher 추가/삭제
   */
  putAdminSlotPublisher: async (slotId: number, payload: Record<string, number | boolean | null>) => {
    const { data } = await api(`/admin/slot/${slotId}/publisher`, {
      method: METHOD.PUT,
      data: payload,
    })
    return data
  },
}

export default campaignApi
