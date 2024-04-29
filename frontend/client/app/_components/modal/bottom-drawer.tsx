"use client"

import React from "react"
import Link from "next/link"
import TestDrawer from "./article-info"
import useBottomDrawer from "./use-bottom-drawer"

interface BottomDrawerProps {}

const BottomDrawer = (props: BottomDrawerProps) => {
  const {} = props

  const { openDrawer } = useBottomDrawer()

  return (
    <div>
      <button
        className="tablet:block hidden"
        onClick={() =>
          openDrawer({
            Component: TestDrawer,
            componentProps: {},
          })
        }
      >
        Modal Open
      </button>

      <Link href="/detail/asdf">
        <button className="tablet:hidden block">Modal Open</button>
      </Link>
    </div>
  )
}

export default BottomDrawer
