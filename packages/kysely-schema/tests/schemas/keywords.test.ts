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
  });

  test("Insert", async () => {
    const keywordArbitary = ZodFastCheck().inputOf(KeywordSchema);

    await fc.assert(
      fc.asyncProperty(keywordArbitary, async (keyword) => {
        await expect(
          Ky.insertInto("keywords").values({
            name: keyword.name,
            is_enabled: +keyword.is_enabled,
            keyword_group_id: keyword.keyword_group_id,
          }).execute
        ).rejects.toThrow(undefined);
      })
    );
  });

  test("Select", async () => {
    const keywords = await Ky.selectFrom("keywords")
      .selectAll()
      .where("keyword_group_id", "=", mockKeywordGroup.id)
      .execute();

    expect(keywords.every((keyword) => KeywordSchema.safeParse(keyword).success)).toBe(true);
  });
});
