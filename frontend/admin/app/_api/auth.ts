import { METHOD } from "./constants"
import api from "./fetch"
import authKey from "./fetch-key/auth"

const authApi = {
  /**
   * 로그인 여부 확인
   */
  getAdminAuthCheck: async () => {
    const data = await api("/admin/auth/check", {
      next: { tags: [authKey.check()] },
    })
    return data
  },

  /**
   * 어드민 ID/PWD 로그인
   */
  postAdminAuthLogin: async ({ id, password }: { id: string; password: string }) => {
    const data = await api("/admin/auth/login", {
      method: METHOD.POST,
      data: { id, password },
    })
    return data
  },

  /**
   * 어드민 ID/PWD 로그인 (refresh)
   */
  postAdminAuthRefresh: async () => {
    const data = await api("/admin/auth/refresh")
    return data
  },

  /**
   * 어드민 로그아웃
   */
  postAdminAuthLogout: async () => {
    const data = await api("/admin/auth/logout")
    return data as { okay: boolean }
  },
}

export default authApi
