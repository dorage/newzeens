import { JSDOM } from "jsdom";
import ky from "ky";
import path from "path";

// TODO:
// retrieve all publishers
//

const host = "https://dolletter.stibee.com";

// retrieve text from url, then generate DOM
export const getDOM = async (url: string) => {
  const res = await ky.get(url);
  const html = await res.text();
  const dom = new JSDOM(html);

  return dom;
};

type NewsletterJobPayload = {
  title: string;
  url: string;
  publisher_id: string;
};

const scrapNewsletter = async (url: string) => {
  const dom = await getDOM(url);

  // get a root
  const root = dom.window.document.querySelector(".inner");
  if (root == null) {
    return;
  }

  return root.textContent;
};

const summarizeNewsletter = async () => {};

const getLatestNewsletterJobs = async (dom: JSDOM) => {
  // check latest 5 newsletters
  const threshold = 5;
  const elems = [...dom.window.document.querySelectorAll(".title")];

  const jobs: NewsletterJobPayload[] = [];

  for (const elem of elems) {
    if (jobs.length >= threshold) break;
    // is it link?
    let cursor = elem;
    while (cursor.parentElement !== null) {
      if (cursor.tagName.toLowerCase() === "a") {
        const href = (cursor as any).href as string;
        jobs.push({
          title: elem.textContent!,
          url: href.startsWith("/") ? path.join(host, href) : href,
          publisher_id: "any",
        });
      }
      cursor = cursor.parentElement;
    }
    continue;
  }

  // TODO:
  // check if the article has already been scraped
  // select job with url
  // return job/null
  // insert into job queue table

  (
    await Promise.all(
      jobs.map((job) => {
        // select job with url
        // return job/null
      })
    )
  ).filter((e) => e !== null);

  return jobs;
};

(async () => {
  console.time("scrap titles");
  const dom = await getDOM(host);

  console.log("dom has generated");
  // 5 newest
  console.log(dom.window.document.querySelectorAll(".title").length);
  const jobs = await getLatestNewsletterJobs(dom);
  // TODO: save jobs
  console.log(jobs);
  console.timeEnd("scrap titles");
})();
