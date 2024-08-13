import React, { ButtonHTMLAttributes } from "react"
import classNames from "@/app/_utils/class-names"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary" | "white"
  className?: string
  children: React.ReactNode
}

const Button = (props: ButtonProps) => {
  const { color, className, children, ...rest } = props
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
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
