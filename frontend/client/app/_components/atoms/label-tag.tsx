import React, { PropsWithChildren } from "react"
import classNames from "@/app/_utils/class-names"

interface LabelTagProps extends PropsWithChildren {
  isSelected?: boolean
  bg4?: boolean
}

const LabelTag = (props: LabelTagProps) => {
  const { isSelected = false, children, bg4 } = props
  return (
    <div
      className={classNames(
        "p-4 size-fit whitespace-nowrap rounded-4  text-element4",
        {
          "text-primary": isSelected,
          "text-gray-65": !isSelected,
        },
        {
          "bg-bg-4": !!bg4,
          "bg-bg": !bg4,
        },
      )}
    >
      {children}
    </div>
  )
}

export default LabelTag
