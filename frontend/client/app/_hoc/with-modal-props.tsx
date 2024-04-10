type WithModalPropsReturn<T> = (props: T & { close: () => void }) => JSX.Element | null

const withModalProps = <T,>(Component: WithModalPropsReturn<T>) => Component

export default withModalProps
