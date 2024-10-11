import { z } from "zod";
import { createScrapingTask, zNewsletterJobPayload } from "../libs/scrap";
import { getDOM } from "./scrap/request";
import puppeteer from "puppeteer";
import { execute } from "./scrap/puppeteer";

const isUrl = (str: string) => {
  return z.string().url().safeParse(str).success;
};

export const testScrapingTask = (
  scrapingTask: ReturnType<typeof createScrapingTask>,
  { describe, test, expect }: { describe: jest.Describe; test: jest.It; expect: jest.Expect }
) => {
  const configs = scrapingTask.configs;

  if (configs.puppeteer) {
    describe(`${scrapingTask.configs.publisherName} scrapList test`, () => {
      test("should return list", async () => {
        const browser = await puppeteer.launch({
          executablePath: "./chrome/linux-131.0.6770.0/chrome-linux64/chrome",
        });
        const page = await browser.newPage();

        await page.goto(configs.host, {
          waitUntil: ["domcontentloaded", "networkidle2"],
        });

        const newsletters = await execute(page, (html) =>
          configs.scrapList(html, { threshold: 3 })
        );
        expect(zNewsletterJobPayload.array().length(3).safeParse(newsletters).success).toEqual(
          true
        );
      });
    });

    describe(`${scrapingTask.configs.publisherName} scrapThumbnail test`, () => {
      test("should return image url", async () => {
        const browser = await puppeteer.launch({
          executablePath: "./chrome/linux-131.0.6770.0/chrome-linux64/chrome",
        });
        const page = await browser.newPage();

        await page.goto(configs.host, {
          waitUntil: ["domcontentloaded", "networkidle2"],
        });

        const newsletters = await execute(page, (html) =>
          configs.scrapList(html, { threshold: 3 })
        );
        const fallbackThumbnailUrl = await execute(page, (html) => configs.scrapThumbnail(html));

        await page.goto(newsletters[0].url, {
          waitUntil: ["domcontentloaded", "networkidle2"],
        });
        const content = await execute(page, (html) => configs.scrapContent(html));
        let thumbnailUrl = await execute(page, (html) => configs.scrapThumbnail(html));

        expect(isUrl(thumbnailUrl) || isUrl(fallbackThumbnailUrl)).toEqual(true);
      });
    });

    return;
  }

  describe(`${scrapingTask.configs.publisherName} scrapList test`, () => {
    test("should return list", async () => {
      const dom = await getDOM(configs.host);

      const articles = await configs.scrapList(dom, { threshold: 3 });
      expect(zNewsletterJobPayload.array().min(1).safeParse(articles).success).toEqual(true);
    });
  });

  describe(`${scrapingTask.configs.publisherName} scrapThumbnail test`, () => {
    test("should return image url", async () => {
      const listDOM = await getDOM(configs.host);
      const articles = await configs.scrapList(listDOM, { threshold: 1 });
      const fallbackThumbnailUrl = await configs.scrapThumbnail(listDOM);

      const articleDOM = await getDOM(articles[0].url);
      let thumbnailUrl = await configs.scrapThumbnail(articleDOM);

      expect(isUrl(thumbnailUrl) || isUrl(fallbackThumbnailUrl)).toEqual(true);
    });
  });
};
