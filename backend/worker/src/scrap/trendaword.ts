import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://maily.so/trendaword";

export default createScrapingTask({
  puppeteer: true,
  host: HOST,
  publisherName: "트렌드어워드",
  scrapList: async (opts) => {
    const elems = [...document.querySelectorAll("#preRenderedPosts > a")];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      jobs.push({
        title: elem.querySelector("p:nth-child(1)")?.textContent!,
        url: (elem as HTMLAnchorElement).href,
      });
    }

    return jobs;
  },
  scrapContent: async () => {
    const root = document.querySelector(".mt-10 > article:nth-child(1)");
    if (root == null) throw new Error("no root element in DOM");
    const content = root.textContent;
    if (content == null) throw new Error("no content under the root element");
    return content;
  },
  scrapThumbnail: async () => {
    const metaImage = document.querySelector('meta[property="og:image"]');
    const sourceUrl = (metaImage as any).content;
    return sourceUrl;
  },
});
