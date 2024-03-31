import { cache } from "react"
import { QueryClient } from "@tanstack/react-query"

/** ------------------------------------------------------------------------------
 * 
 * 서버 페이지, 컴포넌트단에서 사용할수 있는 캐싱된 queryClient 객체입니다.
 * 하위 클라이언트 컴포넌트에게 Dehydrate된 쿼리데이터를 Hydration 할때 사용합니다.
 * 
 * @usage
 * ```
 * 
 * export default async function Page() {
 *  const queryClient = getQueryClient()
 *  ...
 * }
 * 
 * ```
 * 
 ------------------------------------------------------------------------------ */
const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
)

export default getQueryClient
