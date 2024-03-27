export interface HttpOptions {
  // url: string
  headers?: HttpHeaders
  method?: string
  params?: HttpParams
  data?: any
  readTimeout?: number
  connectTimeout?: number
  disableRedirects?: boolean
  webFetchExtra?: RequestInit
  responseType?: HttpResponseType
  shouldEncodeUrlParams?: boolean
  dataType?: "file" | "formData"
  next?: NextFetchRequestConfig | undefined
}
