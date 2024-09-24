import { JSDOM } from "jsdom";
import ky from "ky";
import path from "path";
import { Admin } from "../apis/admin";
import { LLama3 } from "../apis/llama";
import { getDOM } from "../libs/dom";

const HOST = "https://dolletter.stibee.com";
const PUBLISHER = {
  dev: () => {},
  publisher: () => {},
};

type NewsletterJobPayload = {
  title: string;
  url: string;
  publisher_id: string;
};

// TODO:
// things to chnage
// 1. scrap list
// 2. scrap content
// 3. scrap opengraph image

const summarizeNewsletter = async (content: string) => {
  try {
    return LLama3.postGenerate(
      `Summarize next article under 6 lines in korean to make people have interest of the article and return the summary only without any markdown syntax: ${content}`
    );
  } catch (err) {
    console.error(err);
  }
};

const getLatestNewsletters = async (dom: JSDOM) => {
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
          url: href.startsWith("/") ? path.join(HOST, href) : href,
          publisher_id: "any",
        });
      }
      cursor = cursor.parentElement;
    }
    continue;
  }

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

const extractExtension = (url: string) => {
  return url.split(".").pop();
};

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

export default async (opts: { threshold: number }) => {
  console.log(process.env.NODE_ENV, process.env.ADMIN_ID);
  console.time("scrap titles");
  const dom = await getDOM(HOST);

  console.debug("dom has generated");
  // 5 newest
  const newsletters = await getLatestNewsletters(dom);

  for (const newsletter of newsletters) {
    try {
      // const isScraped = await Admin.getScrap(newsletter.url);
      // if (isScraped) continue;
      const dom = await getDOM(newsletter.url);

      // summarize content
      const root = dom.window.document.querySelector(".inner");
      if (root == null) continue;
      const content = root.textContent;
      if (content == null) throw new Error("no content");
      const summary = await summarizeNewsletter(content);
      if (summary == null) throw new Error("no summary");

      // upload article
      const newArticle = await Admin.postArticle({
        title: newsletter.title,
        summary,
        publisher_id: "hfoasv",
        is_enabled: true,
        url: newsletter.url,
      });

      // upload thumbnail
      const metaImage = dom.window.document.querySelector('meta[property="og:image"]');
      const sourceUrl = (metaImage as any).content;
      await uploadThumbnail(newArticle.id, sourceUrl);

      // update scrap info
      // Admin.postScrap(newsletter.url);
      console.log(`uploaded ${newArticle.id}`);
    } catch (err) {
      console.error(err);
    }
  }
  console.timeEnd("scrap titles");
};
