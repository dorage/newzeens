import rankApi, { RankParams } from "@/app/_apis/rank"
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query"

export const getRank = async (params: RankParams) => {
  const result = await rankApi.getRank({ ...params })
  return result
}

export const RANK_LIMIT = 20

export const useGetRank = (params: RankParams) => {
  return useInfiniteQuery({
    queryKey: ["rank", params], // queryKey 설정
    queryFn: ({ pageParam = undefined }) => getRank({ ...params, last_publisher_id: pageParam }), // pageParam 처리
    getNextPageParam: (lastPage) => {
      if (lastPage?.length < RANK_LIMIT) return undefined
      return lastPage?.[lastPage?.length - 1]?.id ?? undefined
    },
    initialPageParam: undefined, // 처음에 undefined로 시작 (첫 페이지 요청)
    placeholderData: keepPreviousData,
  })
}
