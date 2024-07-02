import { AdminPaginationParams } from "./common.type"

export interface AdminPublisherParams extends AdminPaginationParams {
  name?: string
  is_enabled?: boolean
  publisher_id?: string
}

export interface AdminNewsLetterResponse {
  id: string
  thumbnail: string
  name: string
  description: string
  subscriber: number
  preferences?: number
  url_main: string
  url_subscribe: string
  publisher_main: string
  publisher_spec: string
  is_enabled: number | boolean
  created_at: string

  // frontend only
  is_to_be_deleted?: boolean
}

export type AdminNewsLetterListResponse = AdminNewsLetterResponse[]

export interface AdminPublisherPayload {
  name: string
  description: string
  subscriber: number
  thumbnail: string
  url_subscribe: string
  publisher_main: string
  publisher_spec: string
  is_enabled: boolean
}

export interface AdminPublisherIdKeywordPayload {
  keyword_group_id: number
  keyword_id: number | null
}

export interface AdminArticleResponse {
  id: string
  thumbnail: string | null
  title: string
  summary: string
  is_enabled: boolean
  publisher_id: string
  created_at: string
  url: string
  preferences: number | null
}
