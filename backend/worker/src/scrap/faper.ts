import path from "path";
import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://page.stibee.com/archives/70350";

export default createScrapingTask({
  host: HOST,
  publisherName: "faper",
  scrapList: async (dom, opts) => {
    const elems = [
      ...dom.window.document.querySelectorAll("#stb_archives > div.stb_archives_body > div > a"),
    ];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      jobs.push({
        title: elem.querySelector(".title")?.textContent!,
        url: (elem as HTMLAnchorElement).href,
      });
    }

    return jobs;
  },
  scrapContent: async (dom) => {
    const root = dom.window.document.querySelector("body > div > div > table > tbody");
    if (root == null) throw new Error("no root element in DOM");
    const content = root.textContent;
    if (content == null) throw new Error("no content under the root element");
    return content;
  },
  scrapThumbnail: async (dom) => {
    return "https://img.stibee.com/30209_list_70350_archives_header_image.jpg?v=1660439179";
  },
});
