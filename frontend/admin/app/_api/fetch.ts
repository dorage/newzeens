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

  const fetchOptions: any = {
    method: options?.method || "GET",
    headers: {
      ...options?.headers,
      ...(Authorization && { Authorization }),
    },
    credentials: "include",
    next: options?.next,
  }

  // formData 예외처리
  if (options?.data) {
    if (options.data instanceof FormData) {
      fetchOptions.body = options.data // FormData는 stringify 하지 않음
    } else {
      fetchOptions.headers["Content-Type"] = "application/json"
      fetchOptions.body = JSON.stringify(options.data)
    }
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}${params}`, {
    ...fetchOptions,
  })
    .then(async (res) => {
      const json = await res.json()
      return json
    })
    .catch(async (err) => {
      console.log(`error`, err)
    })
}

export default api
