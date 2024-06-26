"use server"

import { redirect } from "next/navigation"
import authApi from "../_api/auth"
import { revalidateTag } from "next/cache"
import authKey from "../_api/fetch-key/auth"
import { setCookie } from "../_utils/cookies"

export const login = async (formData: FormData) => {
  "use server"

  const payload = {
    id: formData.get("id") as string,
    password: formData.get("password") as string,
  }
  const data = await authApi.postAdminAuthLogin(payload)

  if (data.okay) {
    await setCookie("access", data.accessToken)
  }

  revalidateTag(authKey.check())
  redirect(`/`)
}

export const setAccessToken = (token: string) => {
  setCookie("access", token)
  revalidateTag(authKey.check())
}
