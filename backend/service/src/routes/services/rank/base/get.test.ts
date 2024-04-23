import { zRes } from "./get";
import { getPublisherRank } from "./get.query";

describe("get.query", () => {
  test("the result of select publisher rank should be parsed successfully", async () => {
    const res = await getPublisherRank({ limit: 20 });

    expect(zRes.safeParse(res).success).toEqual(true);
  });

  test("cursor based pagination should be work", async () => {
    const limit = 10;
    const cnt = 5;
    let lastPublisherId: string | undefined;

    const base = await getPublisherRank({ limit: limit * cnt });

    for (let i = 0; i < cnt; i++) {
      const page = await getPublisherRank({ limit, lastPublisherId });
      const baseIdx = limit * i;
      expect(page.every((_, idx) => base[baseIdx + idx].id === page[idx].id)).toEqual(true);
      lastPublisherId = page[page.length - 1].id;
    }
  });
});
