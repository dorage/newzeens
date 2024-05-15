import React from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { login } from "@/app/_actions/auth"

interface NeedLoginProps {}

const NeedLogin = (props: NeedLoginProps) => {
  const {} = props
  return (
    <form action={login} className="mx-auto w-full max-w-[670px] rounded-lg border border-gray-300 bg-white p-14">
      <div className="">
        <Label>아이디</Label>
        <Input name="id" />
      </div>

      <div className="mt-6">
        <Label>비밀번호</Label>
        <Input name="password" />
      </div>

      <div className="h-10" />
      <div className="flex justify-end">
        <Button className="">로그인</Button>
      </div>
    </form>
  )
}

export default NeedLogin
