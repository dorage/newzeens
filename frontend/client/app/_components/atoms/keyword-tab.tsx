import React from "react"
import classNames from "@/app/_utils/class-names"

interface KeywordTabProps {
  children: string
  isSelected?: boolean
  onClick: () => void
  className?: string
}

const KeywordTab = (props: KeywordTabProps) => {
  const { children, isSelected = false, onClick, className } = props

  return (
    <div
      onClick={onClick}
      className={classNames(
        "flex transition-all duration-300 ease-in-out justify-center items-center whitespace-nowrap text-mBody4 rounded-full border px-[14px] h-36 md:cursor-pointer",
        {
          "border-gray-40 text-gray-60": !isSelected,
          "bg-gray-80 text-white": isSelected,
        },

        className,
      )}
    >
      {children}
    </div>
  )
}

export default KeywordTab
