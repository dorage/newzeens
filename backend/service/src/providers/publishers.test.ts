import { queryPublisherWithKeywords } from "./publishers";

describe("queryPublisherWithKeywords", () => {
  test("each id should be different", async () => {
    const query = await queryPublisherWithKeywords();
    const results = await query().limit(20).execute();

    const idSet = new Set<string>();

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      idSet.add(result.id);
    }

    expect(idSet.size).toEqual(20);
  });
});
