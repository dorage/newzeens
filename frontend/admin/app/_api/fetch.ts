import { HttpOptions } from "../_types/http"

export const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

// 로컬환경 proxy 사용중
const BASE_URL = `${process.env.NEXT_PUBLIC_WEB_URL}/api`

const api = async (url: string, options?: HttpOptions) => {
  return fetch(`${BASE_URL}${url}`, {
    ...options,
    method: options?.method ?? "GET",
    body: JSON.stringify(options?.data),
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    next: options?.next,
  })
    .then((res) => res.json())
    .catch((err) => console.error(err))
}

export default api
