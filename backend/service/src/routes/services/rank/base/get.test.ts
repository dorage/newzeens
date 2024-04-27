import { Ky } from "@/src/libs/kysely";
import { zRes } from "./get";
import { getKeyword, getPublisherRank } from "./get.model";
import { sql } from "kysely";

const getRandomKeyowrd = async () => {
  const keyword = await Ky.selectFrom("keywords")
    .where((qb) =>
      qb.eb(
        "keywords.keyword_group_id",
        "=",
        qb.selectFrom("keyword_groups").select(["id"]).where("name", "=", "분야").limit(1)
      )
    )
    .selectAll()
    .orderBy(sql`RANDOM()`)
    .executeTakeFirstOrThrow();
  return keyword;
};

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

  test("the result of select publisher rank with wrong cursor should equal with no cursor", async () => {
    const withNoCursor = await getPublisherRank({ limit: 10 });
    const withWrongCursor = await getPublisherRank({
      limit: 10,
      lastPublisherId: "💩💩💩💩💩💩💩💩",
    });

    expect(withWrongCursor).toEqual(withNoCursor);
  });

  test("the result of select keyword should return same row", async () => {
    const keyword = await getRandomKeyowrd();

    const result = await getKeyword({ keyword: keyword.name });

    expect(result).toEqual(keyword);
  });

  test("the result of select publisher rank with keyword filter should have same keywords", async () => {
    const keyword = await getRandomKeyowrd();

    const result = await getPublisherRank({ limit: 10, keyword: keyword.name });

    expect(result.every((_, idx) => keyword.name === result[idx].keywords[0].keyword_name)).toEqual(
      true
    );
  });

  test("the result of select publisher rank with wrong keyword should equal with no filter", async () => {
    const withNoKeyword = await getPublisherRank({ limit: 10 });
    const withWrongKeyword = await getPublisherRank({
      limit: 10,
      keyword: "💩💩💩💩💩💩💩💩",
    });

    expect(withWrongKeyword).toEqual(withNoKeyword);
  });
});
