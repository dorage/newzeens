"use client"

import React, { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import authApi from "@/app/_api/auth"
import { setCookie } from "@/app/_utils/cookies"
import { login, setAccessToken } from "@/app/_actions/auth"
import { useRouter } from "next/navigation"

interface NeedLoginProps {}

const NeedLogin = (props: NeedLoginProps) => {
  const {} = props

  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await authApi.postAdminAuthLogin({ id, password })

    setAccessToken(response.accessToken)

    router.refresh()
  }

  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "id") setId(value)
    if (name === "password") setPassword(value)
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-[670px] rounded-lg border border-gray-300 bg-white p-14">
      <div className="">
        <Label>아이디</Label>
        <Input name="id" value={id} onChange={onChange} />
      </div>

      <div className="mt-6">
        <Label>비밀번호</Label>
        <Input name="password" value={password} onChange={onChange} />
      </div>

      <div className="h-10" />
      <div className="flex justify-end">
        <Button className="">로그인</Button>
      </div>
    </form>
  )
}

export default NeedLogin
