import path from "path";
import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://www.wiseapp.co.kr/insight/";

export default createScrapingTask({
  puppeteer: true,
  host: HOST,
  publisherName: "와이즈앱",
  scrapList: async (opts) => {
    const elems = [...document.querySelectorAll("#insight_card > li > a")];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      jobs.push({
        title: elem.querySelector(".insight_title")?.textContent!,
        url: (elem as HTMLAnchorElement).href,
      });
    }

    return jobs;
  },
  scrapContent: async () => {
    const root = document.querySelector("#div_main_content");
    if (root == null) throw new Error("no root element in DOM");
    const content = root.textContent;
    if (content == null) throw new Error("no content under the root element");
    return content;
  },
  scrapThumbnail: async () => {
    const metaImage = document.querySelector('meta[property="og:image"]');
    if (metaImage == null)
      return "https://www.wiseapp.co.kr:10081/insight-resources//2024-10-07/b008b4c8-25cb-4536-b5e7-b99fd5350850.png";
    const sourceUrl = (metaImage as any).content;
    return sourceUrl;
  },
});
