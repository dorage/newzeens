import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://stibee.com/api/v1.0/emails/share/0IBCdTIItTRGEIlnbS3xtiPpxGkZ_To");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    const content = await page.evaluate(() => {
      const results = [];
      const root = document.querySelector("tbody")!;
      let queue: HTMLElement[] = [root];

      while (queue) {
        const el = queue.shift()!;
        if (el == null) continue;
        const candidates: HTMLElement[] = [];

        // last element
        if (!el.children.length) {
          const content = el.textContent;
          if (content == null) continue;
          if (!content.trim().length) continue;
          results.push(content.trim());
          continue;
        }

        for (let i = 0; i < el.children.length; i++) {
          const item = el.children.item(i);
          if (item == null) continue;
          candidates.push(item as HTMLElement);
        }

        queue = [...candidates, ...queue];
      }

      return document.querySelector("tbody");
    });

    console.log(content);
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
  console.log("DONE");
})();
