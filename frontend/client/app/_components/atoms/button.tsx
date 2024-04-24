import React from "react"
import classNames from "@/app/_utils/class-names"

interface ButtonProps {
  color: "primary" | "white"
  className?: string
  children: React.ReactNode
}

const Button = (props: ButtonProps) => {
  const { color, className, children } = props
  return (
    <button
      type="button"
      className={classNames(
        "rounded-full",
        {
          "bg-primary": color === "primary",
          "bg-white border border-gray-50": color === "white",
        },
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
