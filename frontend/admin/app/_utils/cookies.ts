"use server"

import { cookies } from "next/headers"

export async function getCookie(key: string) {
  "use server"
  return cookies().get(key)?.value
}

export async function setCookie(key: string, value: string) {
  "use server"
  return cookies().set(key, value)
}

export async function deleteCookie(key: string) {
  "use server"
  return cookies().delete(key)
}
