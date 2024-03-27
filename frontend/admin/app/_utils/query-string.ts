/**
 * 쿼리스트링 생성 유틸리티 함수
 */
export const queryString = (params: any): string => {
  const queryParams = Object.keys(params).reduce((acc, key) => {
    const value = params[key]
    // 값이 undefined가 아니면 문자열로 변환하여 누적 객체에 추가
    if (value !== undefined) {
      acc[key] = String(value)
    }
    return acc
  }, {} as Record<string, string>)

  return new URLSearchParams(queryParams).toString()
}
