import { Ky } from "@/src/libs/kysely";
import { selectScrapInfo } from "./get.model";

beforeAll(async () => {
  await Ky.insertInto("scrap_info").values({ url: "abcd" }).execute();
});

afterAll(async () => {
  await Ky.deleteFrom("scrap_info").execute();
});

test("must success selecting scrapinfo", async () => {
  const scrapInfo = await selectScrapInfo("abcd");

  expect(scrapInfo?.url).toEqual("abcd");
});
