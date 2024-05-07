export const dateFormat = (date: string) => {
  // 1분, ..., 59분
  // 1시간, ..., 23시간
  // 1일, ..., 6일
  // 1주, ..., 3주
  const newDate = new Date(date)
  const now = new Date()
  const diff = now.getTime() - newDate.getTime()
  const minute = Math.floor(diff / 1000 / 60)
  const hour = Math.floor(diff / 1000 / 60 / 60)
  const day = Math.floor(diff / 1000 / 60 / 60 / 24)
  const week = Math.floor(diff / 1000 / 60 / 60 / 24 / 7)

  if (minute < 60) {
    return `${minute}분`
  }
  if (hour < 24) {
    return `${hour}시간`
  }
  if (day < 7) {
    return `${day}일`
  }
  return `${week}주`
}
