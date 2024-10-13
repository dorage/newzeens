import path from "path";
import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://page.stibee.com/archives/70350";

export default createScrapingTask({
  puppeteer: true,
  host: HOST,
  publisherName: "faper",
  scrapList: async (opts) => {
    const elems = [...document.querySelectorAll(".item")];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      jobs.push({
        title: elem.querySelector(".title")?.textContent!,
        url: (elem.parentElement as HTMLAnchorElement).href,
      });
    }

    return jobs;
  },
  scrapContent: async () => {
    const root = document.querySelector("body > div > div > table > tbody");
    if (root == null) throw new Error("no root element in DOM");
    const content = root.textContent;
    if (content == null) throw new Error("no content under the root element");
    return content;
  },
  scrapThumbnail: async () => {
    return "https://img.stibee.com/30209_list_70350_archives_header_image.jpg?v=1660439179";
  },
});
