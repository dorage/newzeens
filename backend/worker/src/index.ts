import { JSDOM } from "jsdom";
import ky from "ky";
import path from "path";

const host = "https://dolletter.stibee.com";

export const getHtml = async () => {
  const res = await ky.get(host);
  const html = await res.text();

  return html;
};

type NewsletterJobPayload = {
  title: string;
  url: string;
  publisher_id: string;
};

const getLatestNewsletters = async (dom: JSDOM) => {
  // check latest 5 newsletters
  const threshold = 5;
  const elems = [...dom.window.document.querySelectorAll(".title")];

  const nl: NewsletterJobPayload[] = [];

  for (const elem of elems) {
    if (nl.length >= threshold) break;
    // is it link?
    let cursor = elem;
    while (cursor.parentElement !== null) {
      if (cursor.tagName.toLowerCase() === "a") {
        const href = (cursor as any).href as string;
        nl.push({
          title: elem.textContent!,
          url: href.startsWith("/") ? path.join(host, href) : href,
          publisher_id: "any",
        });
      }
      cursor = cursor.parentElement;
    }
    continue;
  }

  return nl;
};

(async () => {
  console.time("scrap titles");
  const html = await getHtml();
  console.log("html has retrieved");

  const dom = new JSDOM(html);
  console.log("dom has generated");
  // 5 newest
  console.log(dom.window.document.querySelectorAll(".title").length);
  const jobs = await getLatestNewsletters(dom);
  // TODO: save jobs
  console.log(jobs);
  console.timeEnd("scrap titles");
})();
