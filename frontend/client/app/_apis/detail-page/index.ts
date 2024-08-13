import { ArticleDetailDto, PublisherDetailDto } from "./index.type"
import fetch from "../fetch"

const detailApi = {
  getArticle: async ({ articleId }: { articleId: string }) => {
    const response = await fetch(`/article/${articleId}`)
    return response as ArticleDetailDto
  },

  getPublisher: async ({ publisherId }: { publisherId: string }) => {
    const response = await fetch(`/publisher/${publisherId}`)
    return response as PublisherDetailDto
  },
}

export default detailApi
