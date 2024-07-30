import { useQuery } from "@tanstack/react-query"
import detailQueryKey from "../_apis/_query-key/detail"
import detailApi from "../_apis/detail-page"

export const useGetPublisherQuery = ({ publisherId }: { publisherId: string }) => {
  console.log(`publisherId`, publisherId)
  return useQuery({
    queryKey: detailQueryKey.publisher.detail({ publisherId }),
    queryFn: () => detailApi.getPublisher({ publisherId }),
    enabled: !!publisherId,
  })
}
