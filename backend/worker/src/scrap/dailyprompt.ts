import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://maily.so/dailyprompt";

export default createScrapingTask({
  host: HOST,
  publisherName: "Daily Prompt",
  scrapList: async (dom, opts) => {
    const elems = [
      ...dom.window.document.querySelectorAll("#preRenderedPosts > div:nth-child(1) > a"),
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
    const root = dom.window.document.querySelector(
      "#appContainer > div > div > div.col-span-9.lg:col-span-5.lg:col-start-3 > div.mt-10 > article:nth-child(1)"
    );
    if (root == null) throw new Error("no root element in DOM");
    const content = root.textContent;
    if (content == null) throw new Error("no content under the root element");
    return content;
  },
  scrapThumbnail: async (dom) => {
    const metaImage = dom.window.document.querySelector(
      "#appContainer > div > div > div.col-span-9.lg:col-span-5.lg:col-start-3 > div.mt-10 > article:nth-child(1) > figure:nth-child(1) > div > img"
    );
    const sourceUrl = (metaImage as any).src;
    return sourceUrl;
  },
});
