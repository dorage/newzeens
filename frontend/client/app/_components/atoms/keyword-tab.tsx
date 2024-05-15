import React from "react"
import classNames from "@/app/_utils/class-names"

interface KeywordTabProps {
  children: string
  isSelected?: boolean
  onClick: () => void
}

const KeywordTab = (props: KeywordTabProps) => {
  const { children, isSelected = false, onClick } = props

  return (
    <div
      onClick={onClick}
      className={classNames(
        "flex justify-center items-center whitespace-nowrap text-mBody4 rounded-full border px-14 h-36",
        {
          "border-gray-40 text-gray-60": !isSelected,
          "bg-gray-80 text-white": isSelected,
        },
      )}
    >
      {children}
    </div>
  )
}

export default KeywordTab
