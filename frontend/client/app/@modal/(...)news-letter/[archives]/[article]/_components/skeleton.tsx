import classNames from "@/app/_utils/class-names"
import React from "react"

interface SkeletonProps {
  className?: string
  typo?: boolean
  img?: boolean
}

const Skeleton = (props: SkeletonProps) => {
  const { className, img, typo } = props
  return (
    <div
      className={classNames(
        "overflow-hidden",
        {
          "rounded-16": img,
          "rounded-4": typo,
        },
        className,
      )}
    >
      <div className={classNames("skeleton-animation")} />
    </div>
  )
}

export default Skeleton
