import React, { PropsWithChildren } from "react"
import BackButton from "./back-button"

const WidthWrapper = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <div className="relative my-7 w-full max-w-[1200px] bg-white px-14 py-20">
      <BackButton className="absolute left-4 top-4" />
      {children}
    </div>
  )
}

export default WidthWrapper
