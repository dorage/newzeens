import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://maily.so/trendaword";

export default createScrapingTask({
  host: HOST,
  publisherName: "트렌드어워드",
  scrapList: async (dom, opts) => {
    const elems = [...dom.window.document.querySelectorAll("#preRenderedPosts > a")];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      jobs.push({
        title: elem.querySelector(
          "div.flex-1.w-full.flex.flex-col.justify-between.space-y-2.border.border-t-0.border-stone-200.dark:border-stone-600.p-3.lg:p-4 > div:nth-child(1) > p.text-slate-700.dark:text-slate-300.font-bold.text-base.truncate-2-lines.mb-2"
        )?.textContent!,
        url: (elem as HTMLAnchorElement).href,
      });
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
    const metaImage = dom.window.document.querySelector('meta[property="og:image"]');
    const sourceUrl = (metaImage as any).content;
    return sourceUrl;
  },
});
