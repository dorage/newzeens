import { METHOD } from "./constants"
import api from "./fetch"
import articleKey from "./fetch-key/article"
import { AdminArticleResponse, PostAdminArticlePayload, PutAdminArticlePayload } from "./news-letter.type"

const articleApi = {
  /**
   * article 정보 가져오기
   */
  getAdminArticle: async ({ id }: { id: string }) => {
    const data = await api(`/admin/article/${id}`, {
      next: { tags: [articleKey.detail(id)] },
    })
    return data as AdminArticleResponse
  },
  /**
   * article 정보 삭제
   */
  deleteAdminArticle: async ({ id }: { id: string }) => {
    const data = await api(`/admin/article/${id}`, {
      method: METHOD.DELETE,
    })
    return data
  },

  /**
   * article 정보 수정
   */
  putAdminArticle: async ({ id, payload }: PutAdminArticlePayload) => {
    const data = await api(`/admin/article/${id}`, {
      method: METHOD.PUT,
      data: payload,
    })
    return data
  },

  /**
   * article 추가
   */
  postAdminArticle: async (payload: PostAdminArticlePayload) => {
    const data = await api(`/admin/article`, {
      method: METHOD.POST,
      data: payload,
    })
    return data
  },

  /**
   * 업로드 article 썸네일
   */
  postAdminArticleUpload: async ({ id, file }: { id: string; file: any }) => {
    const data = await api(`/admin/article/${id}/upload`, {
      method: METHOD.POST,
      data: file,
    })
    return data
  },
}

export default articleApi
