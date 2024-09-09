import { Ky } from "@/src/libs/kysely";

export const insertScrapInfo = async (url: string) => {
  await Ky.insertInto("scrap_info").values({ url }).execute();
  return true;
};
