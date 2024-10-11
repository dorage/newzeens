import { JSDOM } from "jsdom";
import ky from "ky";
import { InitScrapConfigs, NewsletterJobPayload, ScrapOpts } from ".";
import { Admin } from "../../apis/admin";
import { summarizeNewsletter } from "../llm";
import { isUrl, scrapOnlyOnce, uploadThumbnail } from "./utils";

// retrieve text from url, then generate DOM
export const getDOM = async (url: string) => {
  const res = await ky.get(url);
  const html = await res.text();
  const dom = new JSDOM(html);

  return dom;
};

export type RequestScrapConfigs = InitScrapConfigs & {
  scrapList: (dom: JSDOM, opts: ScrapOpts) => Promise<NewsletterJobPayload[]>;
  scrapContent: (dom: JSDOM) => Promise<string>;
  scrapThumbnail: (dom: JSDOM) => Promise<string>;
  puppeteer?: false;
};

export const normalScraping = (configs: RequestScrapConfigs) => async (opts: ScrapOpts) => {
  const publisher = await Admin.getPublisher(configs.publisherName);
  if (publisher == null) throw new Error("publisher does not exist");

  console.time("scrap titles");
  const dom = await getDOM(configs.host);

  const newsletters = await configs.scrapList(dom, opts);
  const fallbackThumbnailUrl = await configs.scrapThumbnail(dom);

  for (const newsletter of newsletters) {
    try {
      await scrapOnlyOnce(newsletter, async () => {
        const dom = await getDOM(newsletter.url);

        // scrap content
        const content = await configs.scrapContent(dom);
        // summarize content
        const summary = await summarizeNewsletter(content);
        if (summary == null) throw new Error("no summary");

        // upload article
        const newArticle = await Admin.postArticle({
          title: newsletter.title,
          summary,
          publisher_id: publisher.id,
          is_enabled: true,
          url: newsletter.url,
        });

        // scrap thumbnail source
        let sourceUrl = await configs.scrapThumbnail(dom);
        if (!isUrl(sourceUrl)) sourceUrl = fallbackThumbnailUrl;
        // upload & update thumbnail
        if (isUrl(sourceUrl)) await uploadThumbnail(newArticle.id, sourceUrl);

        console.log(`uploaded ${newArticle.id}`);
      });
    } catch (err) {
      console.error(err);
    }
  }
  console.timeEnd("scrap titles");
  // scrap
};
