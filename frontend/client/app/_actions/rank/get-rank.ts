import rankApi, { RankParams } from "@/app/_apis/rank"
import { useQuery } from "@tanstack/react-query"

export const getRank = async (params: RankParams) => {
  const result = await rankApi.getRank(params)
  return result
}

export const useGetRank = (params: RankParams) => {
  return useQuery({
    queryFn: () => getRank({ ...params }),
    queryKey: ["rank", { ...params }],
  })
}
