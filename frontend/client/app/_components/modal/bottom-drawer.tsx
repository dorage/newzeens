"use client"

import React from "react"
import TestDrawer from "./test-drawer"
import useBottomDrawer from "./use-bottom-drawer"

interface BottomDrawerProps {}

const BottomDrawer = (props: BottomDrawerProps) => {
  const {} = props

  const { openDrawer } = useBottomDrawer()

  return (
    <div>
      <button
        className=""
        onClick={() =>
          openDrawer({
            Component: TestDrawer,
            componentProps: {},
          })
        }
      >
        BottomDrawer Open
      </button>
    </div>
  )
}

export default BottomDrawer
