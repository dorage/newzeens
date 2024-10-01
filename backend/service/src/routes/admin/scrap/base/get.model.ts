import { Ky } from "@/src/libs/kysely";

export const selectScrapInfo = async (url: string) => {
  return Ky.selectFrom("scrap_info").selectAll().where("url", "=", url).executeTakeFirst();
};
