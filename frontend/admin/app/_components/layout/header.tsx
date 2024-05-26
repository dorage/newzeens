import authApi from "@/app/_api/auth"
import React from "react"
import { Button } from "../ui/button"

interface HeaderProps {}

const Header = async (props: HeaderProps) => {
  const {} = props
  const authCheck = await authApi.getAdminAuthCheck()

  return (
    <nav className="flex w-full items-center justify-end bg-white px-5 py-2">
      {authCheck && <Button className="">로그아웃</Button>}
    </nav>
  )
}

export default Header
