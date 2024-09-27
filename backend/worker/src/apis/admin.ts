import ky from "ky";
import fs from "fs";
import { ArticleSchema, PublisherSchema } from "kysely-schema";

let accessToken: string;

const HOST = "http://localhost:3000";
const client = ky.create({ prefixUrl: HOST });

const signIn = async () => {
  if (accessToken != null) return;
  const res = await client.post(`admin/auth/login`, {
    json: {
      id: process.env.ADMIN_ID,
      password: process.env.ADMIN_PWD,
    },
  });
  const json = (await res.json()) as any;
  accessToken = json.accessToken;

  return true;
};

const getScrap = async (url: string) => {
  await signIn();
  const res = await client.get(`admin/scrap?url=${encodeURI(url)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = (await res.json()) as { ok: boolean };
  return json.ok;
};

const postScrap = async (url: string) => {
  await signIn();
  await client.post("admin/scrap", {
    headers: { Authorization: `Bearer ${accessToken}` },
    json: { url },
  });
};

const getPublisherList = async () => {
  await signIn();
  const res = await client.get("admin/publisher?page=0&limit=1000", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await res.json();

  fs.writeFileSync(`./publisher_list_${process.env.NODE_ENV}.json`, JSON.stringify(json, null, 2), {
    encoding: "utf-8",
  });
  return true;
};

const postArticle = async (body: {
  title: string;
  summary: string;
  publisher_id: string;
  is_enabled: boolean;
  url: string;
}) => {
  await signIn();
  const res = await client.post("admin/article", {
    headers: { Authorization: `Bearer ${accessToken}` },
    json: { ...body, thumbnail: null },
  });
  return ArticleSchema.parse(await res.json());
};

const postArticleThumbnail = async (articleId: string, formData: FormData) => {
  await signIn();
  await client.post(`admin/article/${articleId}/upload`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
};

const getPublisher = async (publisherName: string) => {
  await signIn();
  const res = await client.get(`admin/publisher?name=${encodeURI(publisherName)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = PublisherSchema.array().parse(await res.json());
  console.log(json);
  return json.at(0);
};

export const Admin = {
  getScrap,
  postScrap,
  postArticle,
  getPublisherList,
  getPublisher,
  postArticleThumbnail,
};
