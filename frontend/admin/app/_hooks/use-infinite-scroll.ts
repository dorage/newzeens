import { useState, useEffect, useCallback } from "react"
import { useInView } from "react-intersection-observer"

interface UseInfiniteScrollParams<KData, TParams> {
  initialValues?: KData[]
  params?: TParams & { page: number }
  apiMethod: (params: TParams & { page: number }) => Promise<KData[]>
}

interface UseInfiniteScrollResult<TData> {
  data: TData[]
  ref: (node?: Element | null | undefined) => void
}

const useInfiniteScroll = <KData, TParams>({
  initialValues = [],
  params = { page: 0 } as TParams & { page: number },
  apiMethod,
}: UseInfiniteScrollParams<KData, TParams>): UseInfiniteScrollResult<KData> => {
  const [page, setPage] = useState<number>(params?.page || 0)
  const [data, setData] = useState(initialValues)
  const { ref, inView } = useInView()

  const fetchNext = useCallback(async () => {
    const newItems = await apiMethod({ ...params, page })
    setData((prev) => [...prev, ...newItems])
    setPage((prev) => prev + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiMethod, params])

  // const searchFetch = useCallback(async () => {
  //   const newItems = await apiMethod(params)
  //   setItems(newItems) // 검색 결과로 목록을 업데이트
  //   setPage(1) // 페이지를 초기화
  // }, [apiMethod])

  useEffect(() => {
    if (inView) {
      fetchNext()
    }
  }, [inView, fetchNext])

  return { data, ref }
}

export default useInfiniteScroll
