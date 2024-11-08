import type { MetadataRoute } from "next"

const DOMAIN = "https://www.maillist.site"
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // 요즘IT
      url: DOMAIN + "/news-letter/odsljy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      // 와이즈앱리테일굿즈
      url: DOMAIN + "/news-letter/sgpktm",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      // 디자인나침반
      url: DOMAIN + "/news-letter/bbzlfu",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]
}
