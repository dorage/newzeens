export interface AdminKeywordPayloadModel {
  name: string
  is_enabled: boolean
}

export interface AdminKeywordGroupResponse {
  id: number
  name: string
  is_enabled: boolean
  created_at: string
}

export interface AdminKeywordResponse {
  id: number
  name: string
  is_enabled: boolean
  keyword_group_id: number
  created_at: string
}

export interface AdminKeywordPostPayload {
  groupId: number
  payload: AdminKeywordPayloadModel
}

export interface AdminKeywordPutPayload extends AdminKeywordPostPayload {
  keywordId: number
}
