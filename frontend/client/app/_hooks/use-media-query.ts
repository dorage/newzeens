import { useState } from "react"
import { useIsomorphicEffect } from "./use-isomorphic-effect"

// inspired by https://github.com/chakra-ui/chakra-ui/issues/3580#issuecomment-1131211586
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null)

  useIsomorphicEffect(() => {
    const queryList = window.matchMedia(query)
    const listener = () => setMatches(queryList.matches)
    listener()
    queryList.addEventListener("change", listener)
    return () => queryList.removeEventListener("change", listener)
  }, [query])

  return matches
}
