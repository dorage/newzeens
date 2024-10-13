import path from "path";
import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://digiq.stibee.com";

export default createScrapingTask({
  host: HOST,
  publisherName: "DGQ",
  scrapList: async (dom, opts) => {
    const elems = [...dom.window.document.querySelectorAll(".clickArea")];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      const title = elem.querySelector(".title");
      if (title == null) throw new Error("there has no title");
      const href = (elem.parentElement as HTMLAnchorElement).href;

      jobs.push({
        title: title.textContent!,
        url: href.startsWith("/") ? path.join(HOST, href) : href,
      });
    }

    return jobs;
  },
  scrapContent: async (dom) => {
    const root = dom.window.document.querySelector("table");
    if (root == null) throw new Error("no root element in DOM");
    const content = root.textContent;
    if (content == null) throw new Error("no content under the root element");
    return content;
  },
  scrapThumbnail: async (dom) => {
    return "https://img.stibee.com/108448_1712975243.jpg";
  },
});
