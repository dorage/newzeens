import fetch from "../fetch"

const detailApi = {
  getArticle: async ({ articleId }: { articleId: string }) => {
    const response = await fetch(`/article/${articleId}`)
    return response
  },

  getPublisher: async ({ publisherId }: { publisherId: string }) => {
    const response = await fetch(`/publisher/${publisherId}`)
    return response
  },
}

export default detailApi
