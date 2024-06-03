import api from "./fetch"
import articleKey from "./fetch-key/article"

const articleApi = {
  getAdminArticle: async ({ id }: { id: string }) => {
    const data = await api(`/admin/article/${id}`, {
      next: { tags: [articleKey.detail(id)] },
    })
    return data as AdminArticleResponse[]
  },
}

export default articleApi
