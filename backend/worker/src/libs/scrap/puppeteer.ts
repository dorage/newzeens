import puppeteer, { EvaluateFunc, Page } from "puppeteer";
import { InitScrapConfigs, NewsletterJobPayload, ScrapOpts } from ".";
import { isUrl, scrapOnlyOnce, uploadThumbnail } from "./utils";
import { summarizeNewsletter } from "../llm";
import { Admin } from "@/src/apis/admin";

export type PuppeteerScrapConfigs = InitScrapConfigs & {
  scrapList: (opts: ScrapOpts) => Promise<NewsletterJobPayload[]>;
  scrapContent: () => Promise<string>;
  scrapThumbnail: () => Promise<string>;
  puppeteer: true;
};

export const puppeteerScraping = (configs: PuppeteerScrapConfigs) => async (opts: ScrapOpts) => {
  const publisher = await Admin.getPublisher(configs.publisherName);
  if (publisher == null) throw new Error("publisher does not exist");

  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(configs.host, {
    waitUntil: ["domcontentloaded", "networkidle2"],
  });

  const newsletters = await page.evaluate(configs.scrapList, opts);
  const fallbackThumbnailUrl = await page.evaluate(configs.scrapThumbnail);

  for (const newsletter of newsletters) {
    try {
      await scrapOnlyOnce(newsletter, async () => {
        await page.goto(newsletter.url, {
          waitUntil: ["domcontentloaded", "networkidle2"],
        });
        // scrap content
        const content = await page.evaluate(configs.scrapContent);
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
        let sourceUrl = await page.evaluate(configs.scrapThumbnail);
        if (!isUrl(sourceUrl)) sourceUrl = fallbackThumbnailUrl;
        // upload & update thumbnail
        if (isUrl(sourceUrl)) await uploadThumbnail(newArticle.id, sourceUrl);

        console.log(`uploaded ${newArticle.id}`);
      });
    } catch (err) {
      console.error(err);
    }
  }
};
