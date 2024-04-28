import { KeywordGroupSchema } from "@/src/schemas/keyword-groups";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { getKeywordGroupArbitary } from "./keyword-groups.mock";

testingTransaction();

describe("keyword_groups schema test", () => {
  beforeAll(async () => {
    await Ky.deleteFrom("keyword_groups").execute();
  });

  test("zod schema should match the db schema strictly", async () => {
    await fc.assert(
      fc.asyncProperty(getKeywordGroupArbitary(), async (keywordGroup) => {
        const result = await Ky.insertInto("keyword_groups")
          .values(keywordGroup)
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(KeywordGroupSchema.strict().safeParse(result).success).toEqual(true);

        await Ky.deleteFrom("keyword_groups").where("id", "=", result.id).execute();
      })
    );
  });
});
