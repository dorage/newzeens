import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://www.careet.net/Newsletter";

export default createScrapingTask({
  host: HOST,
  publisherName: "캐릿",
  scrapList: async (dom, opts) => {
    const elems = [
      ...dom.window.document.querySelectorAll(
        "#content > section.trendletter-list > div > ul > li > a"
      ),
    ];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      jobs.push({
        title: elem.querySelector(".list-title")?.textContent!,
        url: (elem as HTMLAnchorElement).href,
      });
    }

    return jobs;
  },
  scrapContent: async (dom) => {
    const root = dom.window.document.querySelector("#stb-container > tbody > tr > td");
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
