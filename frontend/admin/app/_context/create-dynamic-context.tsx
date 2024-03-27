"use client"

import React, { useContext, useMemo } from "react"

export const createDynamicContext = <TProps extends object>() => {
  const CreateContext = React.createContext<TProps | null>(null)

  const useDynamicContext = () => {
    const contextState = useContext(CreateContext)
    if (contextState == null) {
      throw Error(`해당 Context의 Provider가 상위에 없습니다.`)
    }
    return contextState
  }
  const ContextProvider = ({
    children,
    ...props
  }: { children: React.ReactElement | React.ReactElement[] } & TProps) => (
    <CreateContext.Provider value={props as TProps}>{children}</CreateContext.Provider>
  )

  const withContextProvider = (Component: React.FunctionComponent<TProps>) => {
    const WrappedComponent: React.FunctionComponent<TProps> = (props) => {
      const Memoized = useMemo(() => React.memo<TProps>(Component), [])
      return (
        <ContextProvider {...props}>
          <Memoized {...props} />
        </ContextProvider>
      )
    }
    WrappedComponent.displayName = `withContextProvider(${Component.displayName || Component.name})`
    return WrappedComponent
  }

  return {
    useContext: useDynamicContext,
    Context: CreateContext,
    ContextProvider,
    withContextProvider,
  }
}
