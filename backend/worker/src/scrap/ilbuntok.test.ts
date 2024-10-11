import puppeteer from "puppeteer";
import { testScrapingTask } from "../libs/testing";
import scrapingTask from "./ilbuntok";

// test("description", async () => {
//   const browser = await puppeteer.launch({});
//   const page = await browser.newPage();
//   const res = await page.goto("https://www.google.com", {
//     waitUntil: ["domcontentloaded", "networkidle2"],
//   });
//
//   const src = await page.evaluate(() => {
//     const img = document.querySelector(".lnXdpd");
//     return (img as HTMLImageElement).src;
//   });
//
//   expect(res?.ok()).toEqual(true);
//   console.log(src);
//   expect(src.includes(".png")).toEqual(true);
// });

testScrapingTask(scrapingTask, { describe, test, expect });
