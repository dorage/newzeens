import { KeywordGroupSchema } from "@/src/schemas/keyword-groups";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import { faker } from "@faker-js/faker";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("keyword_groups schema test", () => {
  beforeAll(async () => {
    await Ky.deleteFrom("keyword_groups").execute();
  });

  test("insert, select, and parse", async () => {
    const keywordGroupArbitary = ZodFastCheck()
      .inputOf(KeywordGroupSchema)
      .map((keywordGroup) => ({ ...keywordGroup, is_enabled: +keywordGroup.is_enabled }));

    await fc.assert(
      fc.asyncProperty(keywordGroupArbitary, async (keywordGroup) => {
        const result = await Ky.insertInto("keyword_groups")
          .values({
            id: keywordGroup.id,
            name: keywordGroup.name,
            is_enabled: keywordGroup.is_enabled,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(KeywordGroupSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("keyword_groups").where("id", "=", result.id).execute();
      })
    );
  });
});
