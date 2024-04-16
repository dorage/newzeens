import { KeywordSchema } from "@/src/schemas/keywords";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { getMockKeywordGroup } from "./keyword-groups.mock";
import { getKeywordArbitary } from "./keywords.mock";

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
      fc.asyncProperty(getKeywordArbitary(mockKeywordGroup.id), async (keyword) => {
        const result = await Ky.insertInto("keywords")
          .values(keyword)
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(KeywordSchema.strict().safeParse(result).success).toEqual(true);

        await Ky.deleteFrom("keywords").where("id", "=", result.id).execute();
      })
    );
  });
});
