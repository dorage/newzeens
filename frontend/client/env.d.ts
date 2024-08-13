declare namespace NodeJS {
  interface ProcessEnv {
    readonly HELLO: string
    readonly NEXT_PUBLIC_API_URL: string
    readonly NEXT_PUBLIC_MIXPANEL_TOKEN: string
  }
}
