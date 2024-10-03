"use server"

import mainApi from "@/app/_apis/main-page/main"
export const getArticles = async () => {
  const result = await mainApi.getRecommendArticles()
  return result
}
