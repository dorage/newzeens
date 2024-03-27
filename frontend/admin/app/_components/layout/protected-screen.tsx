import React, { ChangeEvent, FormEvent, PropsWithChildren, useState } from "react"
import { LOCAL_STORAGE_KEY } from "@/app/_constants/storage"
import { useProtectedContext } from "@/app/_context/root-context"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Input } from "../ui/input"

const ProtectedScreen = (props: PropsWithChildren) => {
  const { children } = props

  const { isAllow, setIsAllow } = useProtectedContext()

  const [password, setPassword] = useState("")

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (password !== "0224") return alert("비밀번호를 다시 확인해주세요.")

    localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_ALLOW, password)
    setIsAllow(true)
  }

  if (isAllow) return <>{children}</>

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <p className="">비밀번호 입력</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input maxLength={6} name="password" type="password" value={password} onChange={handleChangeInput} />

          <Button className="" type="submit">
            확인
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProtectedScreen
