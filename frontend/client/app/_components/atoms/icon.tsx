import React from "react"

interface IconProps {
  src: React.FC<React.SVGProps<SVGSVGElement>>
  size: 20 | 24 | 28 | 32 | 40
  className?: string
}

const Icon = (props: IconProps) => {
  const { size, src, className } = props
  return <div>Icon</div>
}

export default Icon
