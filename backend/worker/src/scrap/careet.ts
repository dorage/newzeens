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
      console.log(elem.getAttribute("onclick"));
      const onclick = elem.getAttribute("onclick");
      if (onclick == null) throw new Error("there has no onclick");
      const matches = onclick.match(/\d+/g);
      if (matches == null) throw new Error("there has no matches");
      const [id] = matches;

      jobs.push({
        title: elem.querySelector(".list-title")?.textContent!,
        url: `https://www.careet.net/Newsletter/Detail?id=${id}&pageidx=1`,
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
    return "https://www.careet.netContent/images/share.png";
  },
});
