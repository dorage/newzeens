/**
 * Next Page params + searchParams 타입
 * @generic TParams - Next Page params 객체 타입
 */
export interface NextPageProps<TParams = {}> {
  params: TParams
  searchParams: { [key: string]: string | string[] | undefined }
}
