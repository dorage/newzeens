import path from "path";
import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://dolletter.stibee.com";
const PUBLISHER = {
  dev: () => {},
  publisher: () => {},
};

export default createScrapingTask({
  host: HOST,
  // TODO: getting publisherId
  publisherName: "돌멩이",
  scrapList: async (dom, opts) => {
    const elems = [...dom.window.document.querySelectorAll(".title")];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      // is it link?
      let cursor = elem;
      while (cursor.parentElement !== null) {
        if (cursor.tagName.toLowerCase() === "a") {
          const href = (cursor as any).href as string;
          jobs.push({
            title: elem.textContent!,
            url: href.startsWith("/") ? path.join(HOST, href) : href,
            publisher_id: "any",
          });
        }
        cursor = cursor.parentElement;
      }
      continue;
    }

    return jobs;
  },
  scrapContent: async (dom) => {
    const root = dom.window.document.querySelector(".inner");
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
