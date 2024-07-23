"use server"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const defaultFetch = globalThis?.fetch

const fetch = async (url: string, options?: any) => {
  const urlJoin = `${BASE_URL}${url}`

  try {
    const response = await defaultFetch(urlJoin, {
      ...options,
    })
    const toJson = await response.json()
    return toJson
  } catch (e) {
    console.error(e)
  }
}

export default fetch
