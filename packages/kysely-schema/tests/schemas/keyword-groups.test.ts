import { KeywordGroupSchema } from "@/src/schemas/keyword-groups";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("keyword-groups schema test", () => {
  test("Insert", async () => {
    const keywordGroupArbitary = ZodFastCheck().inputOf(KeywordGroupSchema);

    await fc.assert(
      fc.asyncProperty(keywordGroupArbitary, async (keywordGroup) => {
        await expect(
          Ky.insertInto("keyword_groups").values({
            id: keywordGroup.id,
            name: keywordGroup.name,
            is_enabled: +keywordGroup.is_enabled,
          }).execute
        ).rejects.toThrow(undefined);
      })
    );
  });

  test("Select", async () => {
    const keywordGroups = await Ky.selectFrom("keyword_groups").selectAll().execute();

    expect(keywordGroups.every((article) => KeywordGroupSchema.safeParse(article).success)).toBe(
      true
    );
  });
});
