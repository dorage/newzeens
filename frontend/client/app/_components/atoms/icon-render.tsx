import classNames from "@/app/_utils/class-names"
import { AllIcon, CareerIcon, EconomyIcon, HumanitiesIcon, ITIcon, LifestyleIcon, MarketingIcon } from "@/public/icons"

interface IconRenderProps {
  isSelected: boolean
  index: number
}
const IconRender = (props: IconRenderProps) => {
  const { index, isSelected } = props

  switch (index) {
    case 0:
      return <AllIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />

    case 1:
      return <ITIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />

    case 2:
      return <MarketingIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />

    case 3:
      return <LifestyleIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />

    case 4:
      return <EconomyIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />

    case 5:
      return (
        <HumanitiesIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />
      )

    case 6:
      return <CareerIcon className={classNames("transition-all duration-200 ease-in-out", { "w-0": !isSelected })} />
  }
}

export default IconRender

export const ICON_LIST = [
  {
    name: "전체",
    icon: <AllIcon />,
  },
  {
    name: "IT",
    icon: <ITIcon />,
  },
  {
    name: "마케팅/브랜딩",
    icon: <MarketingIcon />,
  },
  {
    name: "라이프스타일",
    icon: <LifestyleIcon />,
  },
  {
    name: "경제/시사",
    icon: <EconomyIcon />,
  },
  {
    name: "인문/저널리즘",
    icon: <HumanitiesIcon />,
  },
  {
    name: "커리어",
    icon: <CareerIcon />,
  },
]
