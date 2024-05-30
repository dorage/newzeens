import authApi from "@/app/_api/auth"
import React from "react"
import { Button } from "../ui/button"
import { deleteCookie } from "@/app/_utils/cookies"
import Link from "next/link"
import { usePathname } from "next/navigation"
import TabButtons from "./tab-buttons"

const Header = async () => {
  const authCheck = await authApi.getAdminAuthCheck()

  return (
    <header>
      <nav className="flex w-full items-center justify-between bg-white px-5 py-2">
        <div className="flex items-center gap-10">
          <h3 className="align-middle font-extrabold">maillist Admin</h3>
          <TabButtons />
        </div>

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
    </header>
  )
}

export default Header

/*

return <nav className="flex w-full items-center justify-end bg-white px-5 py-2">{authCheck && <ClientLogout />}</nav>

*/
