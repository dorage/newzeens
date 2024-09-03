import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, forwardRef, ReactElement } from "react"

type ScreenReaderOnlyProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

const ScreenReaderOnly = forwardRef(
  <T extends ElementType = "span">(
    { as, ...props }: ScreenReaderOnlyProps<T>,
    ref: ComponentPropsWithRef<T>["ref"],
  ): ReactElement | null => {
    const Component = as || "span"
    return (
      <Component
        {...props}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          borderWidth: 0,
          clip: "rect(0 0 0 0)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          ...props.style,
        }}
        ref={ref}
      />
    )
  },
) as <C extends ElementType = "span">(
  screenReaderOnlyProps: ScreenReaderOnlyProps<C> & {
    ref?: ComponentPropsWithRef<C>["ref"]
  },
) => ReactElement | null

export default ScreenReaderOnly
