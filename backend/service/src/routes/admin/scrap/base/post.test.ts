import { Ky } from "@/src/libs/kysely";
import { insertScrapInfo } from "./post.model";

beforeAll(async () => {
  await Ky.deleteFrom("scrap_info").execute();
});

afterAll(async () => {
  await Ky.deleteFrom("scrap_info").execute();
});

test("must success inserting new url", async () => {
  const res = await insertScrapInfo("abc");

  const scrapInfo = await Ky.selectFrom("scrap_info")
    .selectAll()
    .where("scrap_info.url", "=", "abc")
    .executeTakeFirst();

  expect(scrapInfo?.url).toEqual("abc");
});
