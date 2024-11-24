import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import detailQueryKey from "../_apis/_query-key/detail"
import detailApi from "../_apis/detail-page"

export const useGetPublisherQuery = ({ publisherId }: { publisherId: string }) => {
  return useQuery({
    queryKey: detailQueryKey.publisher.detail({ publisherId }),
    queryFn: () => detailApi.getPublisher({ publisherId }),
    enabled: !!publisherId,
    staleTime: 1000 * 60,
  })
}

export const useGetArticleQuery = ({ articleId }: { articleId: string }) => {
  return useSuspenseQuery({
    queryKey: detailQueryKey.article.detail({ articleId }),
    queryFn: () => detailApi.getArticle({ articleId }),
    // queryFn: () => new Promise((resolve) => setTimeout(() => resolve(detailApi.getArticle({ articleId })), 100000)),
  })
}
