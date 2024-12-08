import { InitialPageParam } from "@tanstack/react-query"
import fetch from "../fetch"

export interface RankParams {
  limit?: number
  last_publisher_id?: string
  keyword_id?: number
}

export interface Keyword {
  id: number
  name: string
  is_enabled: boolean
  keyword_group_id: number
  created_at: string
}

// 어드민에 등록된 직무 키워드
export const JOB_KEYWORD_GROUP = 9

const rankApi = {
  getRank: async ({ keyword_id, last_publisher_id, limit }: RankParams) => {
    const params = new URLSearchParams()

    if (keyword_id !== undefined) params.append("keyword_id", String(keyword_id))
    if (last_publisher_id !== undefined) params.append("last_publisher_id", String(last_publisher_id))
    if (limit !== undefined) params.append("limit", String(limit))

    const data = await fetch(`/rank?${params.toString()}`)
    return data
  },

  /**
   * 직무 키워드 조회
   */
  getKeyword: async () => {
    const data = await fetch(`/keyword-group/${JOB_KEYWORD_GROUP}/keyword`)
    return data as Keyword[]
  },
}

export default rankApi
