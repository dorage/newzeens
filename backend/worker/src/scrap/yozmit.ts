import path from "path";
import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://dolletter.stibee.com";

export default createScrapingTask({
  host: HOST,
  publisherName: "요즘IT",
  scrapList: async (dom, opts) => {
    const elems = [
      ...dom.window.document.querySelectorAll(
        "body > div.layout > div > div.list-item-horizontal.card-animation > div > div > div.item-main > h3 > a"
      ),
    ];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      jobs.push({
        title: elem.textContent!,
        url: (elem as HTMLAnchorElement).href,
      });
      continue;
    }

    return jobs;
  },
  scrapContent: async (dom) => {
    const root = dom.window.document.querySelector(
      "body > div.layout > div.container-wrapper > div.content-container-wrapper > div.content-container > div.next-news-contents.news-highlight-box"
    );
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
