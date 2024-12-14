export const normalizeUrl = (url: string) => {
  if (!url) return ""

  // maillist.site 도메인 제거
  let cleanUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?maillist\.site\//, "")

  // https:/ 패턴 체크 및 수정
  if (cleanUrl.includes("https:/") && !cleanUrl.includes("https://")) {
    cleanUrl = cleanUrl.replace("https:/", "https://")
  }

  // 프로토콜이 없는 경우 https:// 추가
  if (!cleanUrl.startsWith("http")) {
    cleanUrl = `https://${cleanUrl}`
  }

  return cleanUrl
}
