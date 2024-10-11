import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://page.stibee.com/archives/328756";

export default createScrapingTask({
  puppeteer: true,
  host: HOST,
  publisherName: "일분톡",
  scrapList: async (html, opts) => {
    const elems = [...html.querySelectorAll("#stb_archives > div.stb_archives_body > div > a")];

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
  scrapContent: async (html) => {
    const root = html.querySelector("table");
    if (root == null) throw new Error("no root element in DOM");
    const content = root.textContent;
    if (content == null) throw new Error("no content under the root element");
    return content;
  },
  scrapThumbnail: async (html) => {
    const metaImage = html.querySelector('meta[property="og:image"]');
    const sourceUrl = (metaImage as any).content;
    return sourceUrl ?? "https://img.stibee.com/108448_1712975243.jpg";
  },
});
