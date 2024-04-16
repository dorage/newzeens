import {
  ArticleSchema,
  KeywordArticleRelSchema,
  KeywordGroupSchema,
  KeywordSchema,
  PublisherSchema,
} from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import { generateMock } from "@anatine/zod-mock";
import { faker } from "@faker-js/faker";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("keyword_article_rels schema test", () => {
  const mockPublisher = generateMock(PublisherSchema);
  const mockKeywordGroup = generateMock(KeywordGroupSchema);

  beforeAll(async () => {
    await Ky.insertInto("publishers")
      .values({
        id: mockPublisher.id,
        thumbnail: mockPublisher.thumbnail,
        name: mockPublisher.name,
        description: mockPublisher.description,
        subscriber: mockPublisher.subscriber,
        url_subscribe: mockPublisher.url_subscribe,
        publisher_main: mockPublisher.publisher_main,
        publisher_spec: mockPublisher.publisher_spec,
        is_enabled: +mockPublisher.is_enabled,
      })
      .execute();

    await Ky.insertInto("keyword_groups")
      .values({
        id: mockKeywordGroup.id,
        name: mockKeywordGroup.name,
        is_enabled: +mockKeywordGroup.is_enabled,
      })
      .execute();

    await Ky.deleteFrom("articles").execute();
    await Ky.deleteFrom("keywords").execute();
  });

  test("insert, select, and parse", async () => {
    const articleArbitary = ZodFastCheck()
      .inputOf(ArticleSchema)
      .map((article) => ({
        ...article,
        id: faker.string.nanoid(6),
        is_enabled: +article.is_enabled,
        publisher_id: mockPublisher.id,
      }));
    const keywordArbitary = ZodFastCheck()
      .inputOf(KeywordSchema)
      .map((keyword) => ({
        ...keyword,
        is_enabled: +keyword.is_enabled,
        keyword_group_id: mockKeywordGroup.id,
      }));

    await fc.assert(
      fc.asyncProperty(articleArbitary, keywordArbitary, async (article, keyword) => {
        article.id = faker.string.nanoid(6);

        await Ky.insertInto("articles")
          .values({
            id: article.id,
            thumbnail: article.thumbnail,
            title: article.title,
            summary: article.summary,
            is_enabled: article.is_enabled,
            publisher_id: article.publisher_id,
          })
          .execute();

        await Ky.insertInto("keywords")
          .values({
            id: keyword.id,
            name: keyword.name,
            is_enabled: keyword.is_enabled,
            keyword_group_id: keyword.keyword_group_id,
          })
          .execute();

        const result = await Ky.insertInto("keyword_article_rels")
          .values({
            keyword_id: keyword.id,
            article_id: article.id,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(KeywordArticleRelSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("articles").where("id", "=", result.article_id).execute();
        await Ky.deleteFrom("keywords").where("id", "=", result.keyword_id).execute();
      })
    );
  });
});
