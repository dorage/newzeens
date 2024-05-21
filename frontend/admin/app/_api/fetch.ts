import { cookies } from "next/headers"
import { HttpOptions } from "../_types/http"
import { getCookie } from "../_utils/cookies"
import authApi from "./auth"

export const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

// 로컬환경 proxy 사용중
// const BASE_URL = `${process.env.NEXT_PUBLIC_WEB_URL}/api`
const BASE_URL = `http://localhost:3000`

const api = async (url: string, options?: HttpOptions) => {
  const accessToken = await getCookie("access")
  const Authorization = accessToken ? `Bearer ${accessToken}` : undefined

  return fetch(`${BASE_URL}${url}`, {
    ...options,
    method: options?.method ?? "GET",
    body: JSON.stringify(options?.data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(Authorization && { Authorization }),
      ...options?.headers,
    },
    next: options?.next,
  })
    .then((res) => {
      console.log(`res`, res)
      return res.json()
    })
    .catch(async (err) => {
      console.log(`err`, err)
      // const response = await authApi.postAdminAuthRefresh()
      // console.log("🚀 ~ api ~ response:", response)

      // const a = await fetch(`${BASE_URL}/auth/refresh`, {
      //   method: "POST",
      // })

      // const json = await a.json()
      // console.log("🚀 ~ api ~ json:", json)

      return { okay: false }
    })
}

export default api
