"use server"

import { HttpOptions } from "../_types/http"
import { getCookie } from "../_utils/cookies"

const api = async (url: string, options?: HttpOptions) => {
  const accessToken = await getCookie("access")
  const Authorization = accessToken ? `Bearer ${accessToken}` : undefined

  let params = ""

  if (options?.params) {
    params = `?${new URLSearchParams(options?.params).toString()}`
  }

  return fetch(`${"http://127.0.0.1:3000"}${url}${params}`, {
    ...options,
    method: options?.method ?? "GET",
    body: JSON.stringify(options?.data),
    credentials: "include",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
      ...(Authorization && { Authorization }),
    },
    next: options?.next,
  })
    .then(async (res) => {
      const json = await res.json()
      return json
    })
    .catch(async (err) => {
      console.log(`error`, err)
      throw new Error(err)
    })
}

export default api
