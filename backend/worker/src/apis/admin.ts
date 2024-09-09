import ky from "ky";
import fs from "fs";

let accessToken: string;

const HOST = "http://localhost:3000";
const client = ky.create({ prefixUrl: HOST });

const signIn = async () => {
  if (accessToken != null) return;
  const res = await client.post(`/admin/auth/login`, {
    json: {
      id: "admin",
      password: "password",
    },
  });
  const json = (await res.json()) as any;
  accessToken = json.accessToken;

  return true;
};

const getScrap = async (url: string) => {
  await signIn();
  const res = await client.get(`/admin/scrap?url=${encodeURI(url)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = (await res.json()) as { ok: boolean };
  return json.ok;
};

const postScrap = async (url: string) => {
  await signIn();
  await ky.post("/admin/scrap", {
    headers: { Authorization: `Bearer ${accessToken}` },
    json: { url },
  });
};

const getPublisherList = async () => {
  await signIn();
  const res = await ky.get("/admin/publisher?page=0&limit=1000", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await res.json();

  fs.writeFileSync(`publisher_list_${process.env.NODE_ENV}.json`, JSON.stringify(json, null, 2), {
    encoding: "utf-8",
  });
};

export const Admin = {
  getScrap,
  postScrap,
  getPublisherList,
};
