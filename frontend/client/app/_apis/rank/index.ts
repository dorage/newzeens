import fetch from "../fetch"

export interface RankParams {
  limit?: number
  last_publisher_id?: string
  keyword_id?: number
}

const rankApi = {
  getRank: async ({ keyword_id, last_publisher_id, limit }: RankParams) => {
    const params = new URLSearchParams()

    if (keyword_id !== undefined) params.append("keyword_id", String(keyword_id))
    if (last_publisher_id !== undefined) params.append("last_publisher_id", String(last_publisher_id))
    if (limit !== undefined) params.append("limit", String(limit))

    const { data } = await fetch(`/rank?${params.toString()}`)
    return data
  },
}

export default rankApi
