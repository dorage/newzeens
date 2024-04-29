import { KeywordPublisherRelSchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { getMockKeywordGroup } from "./keyword-groups.mock";
import { getKeywordArbitary } from "./keywords.mock";
import { getPublisherArbitary } from "./publishers.mock";

testingTransaction();

describe("zod schema test", () => {
  const mockKeywordGroup = getMockKeywordGroup();

  beforeAll(async () => {
    await Ky.insertInto("keyword_groups")
      .values({
        ...mockKeywordGroup,
        is_enabled: +mockKeywordGroup.is_enabled,
      })
      .execute();

    await Ky.deleteFrom("keywords").execute();
  });

  test("zod schema should match the db schema strictly", async () => {
    await fc.assert(
      fc.asyncProperty(
        getPublisherArbitary(),
        getKeywordArbitary(mockKeywordGroup.id),
        async (publisher, keyword) => {
          await Ky.insertInto("publishers").values(publisher).execute();
          await Ky.insertInto("keywords").values(keyword).execute();

          const result = await Ky.insertInto("keyword_publisher_rels")
            .values({
              keyword_group_id: mockKeywordGroup.id,
              keyword_id: keyword.id,
              publisher_id: publisher.id,
            })
            .returningAll()
            .executeTakeFirstOrThrow();

          expect(KeywordPublisherRelSchema.strict().safeParse(result).success).toEqual(true);

          await Ky.deleteFrom("publishers").where("id", "=", result.publisher_id).execute();
          await Ky.deleteFrom("keywords").where("id", "=", result.keyword_id).execute();
        }
      )
    );
  });
});
