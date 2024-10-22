import { useQuery } from "@tanstack/react-query"
import detailQueryKey from "../_apis/_query-key/detail"
import detailApi from "../_apis/detail-page"

export const useGetPublisherQuery = ({ publisherId }: { publisherId: string }) => {
  return useQuery({
    queryKey: detailQueryKey.publisher.detail({ publisherId }),
    queryFn: () => detailApi.getPublisher({ publisherId }),
    enabled: !!publisherId,
  })
}

export const useGetArticleQuery = ({ articleId }: { articleId: string }) => {
  return useQuery({
    queryKey: detailQueryKey.article.detail({ articleId }),
    queryFn: () => detailApi.getArticle({ articleId }),
    enabled: !!articleId,
  })
}
