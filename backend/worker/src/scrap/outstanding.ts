import path from "path";
import { createScrapingTask, NewsletterJobPayload } from "../libs/scrap";

const HOST = "https://us1.campaign-archive.com/home/?u=58649932600b1a93ad942d0a7&id=546a6b6aba";

export default createScrapingTask({
  host: HOST,
  publisherName: "아웃스탠딩",
  scrapList: async (dom, opts) => {
    const elems = [...dom.window.document.querySelectorAll("#archive-list > div > li > a")];

    const jobs: NewsletterJobPayload[] = [];

    for (const elem of elems) {
      if (jobs.length >= opts.threshold) break;
      jobs.push({
        title: elem.textContent!,
        url: (elem as HTMLAnchorElement).href,
      });
      continue;
    }

    return jobs;
  },
  scrapContent: async (dom) => {
    const root = dom.window.document.querySelector(
      "#archivebody > div:nth-child(2) > div:nth-child(4) > table > tbody > tr > td"
    );
    if (root == null) throw new Error("no root element in DOM");
    const content = root.textContent;
    if (content == null) throw new Error("no content under the root element");
    return content;
  },
  scrapThumbnail: async (dom) => {
    return "https://s3.ap-northeast-2.amazonaws.com/img.stibee.com/59013_1639985587.png";
  },
});
