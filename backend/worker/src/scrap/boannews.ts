import path from "path";
import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://www.boannews.com/newsletter/";

export default createScrapingTask({
  host: HOST,
  publisherName: "보안뉴스",
  scrapList: async (dom, opts) => {
    const elems = [
      ...dom.window.document.querySelectorAll(
        "#body_right > div > table:nth-child(4) > tbody > tr > td > a"
      ),
    ];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      // is it link?
      jobs.push({
        title: elem.textContent as string,
        url: (elem as HTMLAnchorElement).href,
      });
      continue;
    }

    return jobs;
  },
  scrapContent: async (dom) => {
    const root = dom.window.document.querySelector("#body_right > div > table:nth-child(6)");
    if (root == null) throw new Error("no root element in DOM");
    const content = root.textContent;
    if (content == null) throw new Error("no content under the root element");
    return content;
  },
  scrapThumbnail: async (dom) => {
    const metaImage = dom.window.document.querySelector('meta[property="og:image"]');
    const sourceUrl = (metaImage as any).content;
    return sourceUrl;
  },
});
