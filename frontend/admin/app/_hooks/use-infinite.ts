import { useCallback, useEffect, useRef, useState } from "react"

const useInfiniteScroll = (initialUrl, limit = 10) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef(null)

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { threshold: 0.5 },
    ),
  )

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${initialUrl}?page=${page}&limit=${limit}`)
      const newData = await response.json()
      setData((prevData) => [...prevData, ...newData.items])
      setHasMore(newData.items.length === limit)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [initialUrl, page, limit])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    const currentObserver = observer.current
    const currentRef = observerRef.current
    if (currentRef) {
      currentObserver.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        currentObserver.unobserve(currentRef)
      }
    }
  }, [loading, hasMore])

  return { data, loading, error, hasMore, observerRef }
}

export default useInfiniteScroll
