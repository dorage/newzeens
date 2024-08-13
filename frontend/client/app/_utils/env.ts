export const isProduction = () => {
  return process.env.NODE_ENV === "production"
}

export const getMXToken = () => {
  return process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
}
