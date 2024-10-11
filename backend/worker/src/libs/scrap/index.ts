import { z } from "zod";
import { PuppeteerScrapConfigs, puppeteerScraping } from "./puppeteer";
import { normalScraping, RequestScrapConfigs } from "./request";

export const zNewsletterJobPayload = z.object({
  title: z.string(),
  url: z.string().url(),
});
export type NewsletterJobPayload = z.infer<typeof zNewsletterJobPayload>;

export type InitScrapConfigs = {
  host: string;
  publisherName: string;
};

type ScrapConfigs = PuppeteerScrapConfigs | RequestScrapConfigs;

export type ScrapOpts = {
  threshold: number;
};

type ScrapingTask = {
  (opts: ScrapOpts): Promise<void>;
  configs: ScrapConfigs;
};

export function createScrapingTask(configs: ScrapConfigs): ScrapingTask {
  const scrapingTask: any = configs.puppeteer
    ? puppeteerScraping(configs)
    : normalScraping(configs);
  // for testing
  scrapingTask.configs = configs;

  return scrapingTask as ScrapingTask;
}
