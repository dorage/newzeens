import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://maily.so/dailyprompt";

export default createScrapingTask({
  puppeteer: true,
  host: HOST,
  publisherName: "Daily Prompt",
  scrapList: async (opts) => {
    const elems = [...document.querySelectorAll("#preRenderedPosts > div > a")];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;

      const title = elem.querySelector(".text-slate-900");
      if (title == null) throw new Error("there has no title");

      jobs.push({
        title: (title.textContent as string).trim(),
        url: (elem as HTMLAnchorElement).href,
      });
      continue;
    }

    return jobs;
  },
  scrapContent: async () => {
    const root = document.querySelector("article");
    if (root == null) throw new Error("no root element in DOM");
    const content = root.textContent;
    if (content == null) throw new Error("no content under the root element");
    return content;
  },
  scrapThumbnail: async () => {
    return "https://cdn.maily.so/202305/1682941164746129.jpeg";
  },
});
