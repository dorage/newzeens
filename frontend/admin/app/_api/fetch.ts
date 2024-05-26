"use server"

import { HttpOptions } from "../_types/http"
import { getCookie } from "../_utils/cookies"

const api = async (url: string, options?: HttpOptions) => {
  const accessToken = await getCookie("access")
  const Authorization = accessToken ? `Bearer ${accessToken}` : undefined

  return fetch(`${"http://localhost:3000"}${url}`, {
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
      return { okay: false }
    })
}

export default api
