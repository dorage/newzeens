import authApi from "@/app/_api/auth"
import React from "react"
import { Button } from "../ui/button"
import { deleteCookie } from "@/app/_utils/cookies"

interface HeaderProps {}

const Header = async (props: HeaderProps) => {
  const {} = props
  const authCheck = await authApi.getAdminAuthCheck()

  return (
    <nav className="flex w-full items-center justify-end bg-white px-5 py-2">
      {authCheck && (
        <form
          action={async () => {
            "use server"
            deleteCookie("access")
          }}
        >
          <Button type="submit" className="">
            로그아웃
          </Button>
        </form>
      )}
    </nav>
  )
}

export default Header

/*

return <nav className="flex w-full items-center justify-end bg-white px-5 py-2">{authCheck && <ClientLogout />}</nav>

*/
