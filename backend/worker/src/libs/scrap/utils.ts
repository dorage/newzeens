import { z } from "zod";
import { NewsletterJobPayload } from ".";
import { Admin } from "../../apis/admin";

// is string a url?
export const isUrl = (str: string) => {
  return z.string().url().safeParse(str).success;
};

// extract image file extension from url (PNG/WEBP)
const extractExtension = (url: string) => {
  return url.split(".").pop();
};

// update thumbnail of article of articleId
export const uploadThumbnail = async (articleId: string, sourceUrl: string) => {
  // download
  const res = await fetch(sourceUrl);
  // const buffer = res.arrayBuffer();
  const blob = await res.blob();
  // // upload
  const formData = new FormData();
  formData.append("file", blob, `${articleId}.${extractExtension(sourceUrl)}`);
  await Admin.postArticleThumbnail(articleId, formData);
};

export const scrapOnlyOnce = async (newsletter: NewsletterJobPayload, fn: () => Promise<void>) => {
  const isScraped = await Admin.getScrap(newsletter.url);
  if (isScraped) return;
  await fn();
  // update scrap_info
  await Admin.postScrap(newsletter.url);
};
