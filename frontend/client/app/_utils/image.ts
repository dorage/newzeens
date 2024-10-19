/**
 * next_image 템플릿에서 사용됩니다
 */
export const getImageUrl = (url: string) => {
  if (!url) return ""
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  return `${BASE_URL}/_next/image?url=${url}&w=2048&q=100`
}
