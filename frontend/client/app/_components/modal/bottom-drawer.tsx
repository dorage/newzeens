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
        className="hidden"
        onClick={() =>
          openDrawer({
            Component: TestDrawer,
            componentProps: {},
          })
        }
      >
        Modal Open
      </button>
    </div>
  )
}

export default BottomDrawer
