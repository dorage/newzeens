import { KeywordArticleRelSchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import { faker } from "@faker-js/faker";
import fc from "fast-check";
import { getArticleArbitary } from "./articles.mock";
import { getMockKeywordGroup } from "./keyword-groups.mock";
import { getKeywordArbitary } from "./keywords.mock";
import { getMockPublisher } from "./publishers.mock";

testingTransaction();

describe("zod schema test", () => {
  const mockPublisher = getMockPublisher();
  const mockKeywordGroup = getMockKeywordGroup();

  beforeAll(async () => {
    await Ky.insertInto("publishers")
      .values({ ...mockPublisher, is_enabled: +mockPublisher.is_enabled })
      .execute();
    await Ky.insertInto("keyword_groups")
      .values({ ...mockKeywordGroup, is_enabled: +mockKeywordGroup.is_enabled })
      .execute();

    await Ky.deleteFrom("articles").execute();
    await Ky.deleteFrom("keywords").execute();
  });

  test("zod schema should match the db schema strictly", async () => {
    await fc.assert(
      fc.asyncProperty(
        getArticleArbitary(mockPublisher.id),
        getKeywordArbitary(mockKeywordGroup.id),

        async (article, keyword) => {
          article.id = faker.string.nanoid(6);

          await Ky.insertInto("articles").values(article).execute();

          await Ky.insertInto("keywords").values(keyword).execute();

          const result = await Ky.insertInto("keyword_article_rels")
            .values({
              keyword_id: keyword.id,
              article_id: article.id,
            })
            .returningAll()
            .executeTakeFirstOrThrow();

          expect(KeywordArticleRelSchema.strict().safeParse(result).success).toEqual(true);

          await Ky.deleteFrom("articles").where("id", "=", result.article_id).execute();
          await Ky.deleteFrom("keywords").where("id", "=", result.keyword_id).execute();
        }
      )
    );
  });
});
