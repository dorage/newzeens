import path from "path";
import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://designcompass.org/magazine/";

export default createScrapingTask({
  puppeteer: true,
  host: HOST,
  publisherName: "디자인 나침반",
  scrapList: async (opts) => {
    const elems = [
      ...document.querySelectorAll(
        "#uc_post_grid_elementor_3e23875 a.uc_post_grid_style_one_image"
      ),
    ];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      const title = elem.parentElement?.querySelector(".ue_p_title");
      if (title == null) throw new Error("there has no title");

      jobs.push({
        title: title.textContent as string,
        url: (elem as HTMLAnchorElement).href,
      });
    }

    return jobs;
  },
  scrapContent: async () => {
    const root = document.querySelector(
      "[data-elementor-type='single-post'] > section:nth-child(4)"
    );
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
