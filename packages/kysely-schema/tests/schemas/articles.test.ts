import { ArticleSchema } from "@/src/schemas/articles";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { getArticleArbitary } from "./articles.mock";
import { getMockPublisher } from "./publishers.mock";

testingTransaction();

describe("zod schema test", () => {
  const mockPublisher = getMockPublisher();

  beforeAll(async () => {
    await Ky.insertInto("publishers")
      .values({ ...mockPublisher, is_enabled: +mockPublisher.is_enabled })
      .execute();

    await Ky.deleteFrom("articles").execute();
  });

  test("zod schema should match the db schema strictly", async () => {
    await fc.assert(
      fc.asyncProperty(getArticleArbitary(mockPublisher.id), async (article) => {
        const result = await Ky.insertInto("articles")
          .values(article)
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(ArticleSchema.strict().safeParse(result).success).toEqual(true);

        await Ky.deleteFrom("articles").where("id", "=", result.id).execute();
      })
    );
  });
});
