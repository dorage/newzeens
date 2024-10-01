import ky from "ky";
import { JSDOM } from "jsdom";
import { Admin } from "../apis/admin";
import { summarizeNewsletter } from "./llm";

// retrieve text from url, then generate DOM
const getDOM = async (url: string) => {
  const res = await ky.get(url);
  const html = await res.text();
  const dom = new JSDOM(html);

  return dom;
};

// extract image file extension from url (PNG/WEBP)
const extractExtension = (url: string) => {
  return url.split(".").pop();
};

// update thumbnail of article of articleId
const uploadThumbnail = async (articleId: string, sourceUrl: string) => {
  // download
  const res = await fetch(sourceUrl);
  // const buffer = res.arrayBuffer();
  const blob = await res.blob();
  // // upload
  const formData = new FormData();
  formData.append("file", blob, `${articleId}.${extractExtension(sourceUrl)}`);
  await Admin.postArticleThumbnail(articleId, formData);
};

export type NewsletterJobPayload = {
  title: string;
  url: string;
};

export type ScrapConfigs = {
  host: string;
  publisherName: string;
  scrapList: (dom: JSDOM, opts: ScrapOpts) => Promise<NewsletterJobPayload[]>;
  scrapContent: (dom: JSDOM) => Promise<string>;
  scrapThumbnail: (dom: JSDOM) => Promise<string>;
};

export type ScrapOpts = {
  threshold: number;
};

export function createScrapingTask(configs: ScrapConfigs) {
  const scrapingTask = async (opts: ScrapOpts) => {
    const publisher = await Admin.getPublisher(configs.publisherName);
    if (publisher == null) throw new Error("publisher does not exist");

    console.time("scrap titles");
    const dom = await getDOM(configs.host);

    const newsletters = await configs.scrapList(dom, opts);
    console.debug("latest newsletter count", newsletters.length);

    for (const newsletter of newsletters) {
      try {
        // check, if scraped already
        const isScraped = await Admin.getScrap(newsletter.url);
        if (isScraped) continue;
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
        const sourceUrl = await configs.scrapThumbnail(dom);
        // upload & update thumbnail
        await uploadThumbnail(newArticle.id, sourceUrl);

        // update scrap_info
        Admin.postScrap(newsletter.url);
        console.log(`uploaded ${newArticle.id}`);
      } catch (err) {
        console.error(err);
      }
    }
    console.timeEnd("scrap titles");
    // scrap
  };

  // for testing
  scrapingTask.configs = configs;

  return scrapingTask;
}
