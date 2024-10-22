import fetch from "../fetch"

export interface RankParams {
  word?: string
}

const searchApi = {
  getSearch: async ({ word }: RankParams) => {
    const params = new URLSearchParams()

    if (word !== undefined && word !== "") params.append("word", String(word))

    const data = await fetch(`/search?${params.toString()}`)
    return data as SearchDto[]
  },
}

export default searchApi

interface SearchDto {
  keywords: [
    {
      keyword_id: number
      keyword_name: string
      keyword_group_id: number
      keyword_group_name: string
    },
  ]
  id: string
  name: string
  description: string
  thumbnail: string
}
