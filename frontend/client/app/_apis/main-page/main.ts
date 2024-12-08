import { CAMPAIGN } from "./constants"
import { CampaignArticlesResponse, CampaignPublishersResponse } from "./main.type"
import fetch from "../fetch"

export const getCampaignArticles = (id: number) => `/campaign/${id}/article`
export const getCampaignPublisher = (id: number) => `/campaign/${id}/publisher?limit=6`

const mainApi = {
  getRecommendArticles: async () => {
    const response = await fetch(getCampaignArticles(CAMPAIGN.top))
    return response as CampaignArticlesResponse
  },

  getRecommendPublishers: async () => {
    const response = await fetch(getCampaignPublisher(CAMPAIGN.bottom))
    return response as CampaignPublishersResponse
  },
}

export default mainApi
