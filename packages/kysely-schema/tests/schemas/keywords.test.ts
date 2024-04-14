import { KeywordGroupSchema } from "@/src/index";
import { KeywordSchema } from "@/src/schemas/keywords";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import { generateMock } from "@anatine/zod-mock";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("keywords schema test", () => {
  const mockKeywordGroup = generateMock(KeywordGroupSchema);

  beforeAll(async () => {
    await Ky.insertInto("keyword_groups")
      .values({
        id: mockKeywordGroup.id,
        name: mockKeywordGroup.name,
        is_enabled: +mockKeywordGroup.is_enabled,
      })
      .execute();

    await Ky.deleteFrom("keywords").execute();
  });

  test("insert, select, and parse", async () => {
    const keywordArbitary = ZodFastCheck()
      .inputOf(KeywordSchema)
      .map((keyword) => ({
        ...keyword,
        is_enabled: +keyword.is_enabled,
        keyword_group_id: mockKeywordGroup.id,
      }));

    await fc.assert(
      fc.asyncProperty(keywordArbitary, async (keyword) => {
        const result = await Ky.insertInto("keywords")
          .values({
            name: keyword.name,
            is_enabled: keyword.is_enabled,
            keyword_group_id: keyword.keyword_group_id,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(KeywordSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("keywords").where("id", "=", result.id).execute();
      })
    );
  });
});
