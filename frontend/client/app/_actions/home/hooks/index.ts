import { useQuery } from "@tanstack/react-query"
import { getArticles } from "../get-articles"
import mainQueryKey from "@/app/_apis/_query-key/main"

export const useGetArticles = () => {
  return useQuery({
    queryFn: () => getArticles(),
    queryKey:  mainQueryKey.recommendArticles.list({}),
  })
}