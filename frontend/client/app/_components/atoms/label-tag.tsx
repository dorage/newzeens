import classNames from "@/app/_utils/class-names"
import React, { PropsWithChildren } from "react"

interface LabelTagProps extends PropsWithChildren {
isSelected?: boolean

}

const LabelTag = (props: LabelTagProps) => {
  const {isSelected = false, children} = props
  return <div className={classNames("p-4 size-fit rounded-4 bg-bg text-element4", {
    "text-primary": isSelected,
    "text-gray-65": !isSelected
  })}>{children}</div>
}

export default LabelTag
