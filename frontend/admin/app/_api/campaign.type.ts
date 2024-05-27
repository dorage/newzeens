export interface CampaignResponse {
  id: number
  name: "string"
  description: "string"
  comment: "string"
  created_at: "string"
}

export interface PostCampaignPayload {
  name: string
  description: string
  comment: string
}

export interface PostCampaignSlotPayload {
  name: string
  description: string
  comment: string
  preferences: number
}
