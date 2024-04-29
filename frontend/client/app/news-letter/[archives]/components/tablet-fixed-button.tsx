import React from "react"

interface TabletFixedButtonProps {}

const TabletFixedButton = (props: TabletFixedButtonProps) => {
  const {} = props
  return (
    <div className="tablet:flex fixed bottom-0 hidden w-full bg-white p-20">
      <button className="bg-primary text-body1 flex-1 items-center justify-center rounded-full py-20 leading-none text-white">
        구독
      </button>
    </div>
  )
}

export default TabletFixedButton
