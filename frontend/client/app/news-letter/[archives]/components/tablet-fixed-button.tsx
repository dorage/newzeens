import React from "react"

interface TabletFixedButtonProps {}

/**
 * 뷰포트 1278px 까지일때 보이는 fixed button
 */
const TabletFixedButton = (props: TabletFixedButtonProps) => {
  const {} = props
  return (
    <div className="fixed bottom-0 flex w-full bg-white p-20 xl:hidden">
      <button className="bg-primary text-body1 flex-1 items-center justify-center rounded-full py-20 leading-none text-white">
        구독
      </button>
    </div>
  )
}

export default TabletFixedButton
