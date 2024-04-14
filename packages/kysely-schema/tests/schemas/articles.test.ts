import { ArticleSchema } from "@/src/schemas/articles";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";
import { generateMock } from "@anatine/zod-mock";
import { PublisherSchema } from "@/src/index";
import { faker } from "@faker-js/faker";

testingTransaction();

describe("articles schema test", () => {
  const mockPublisher = generateMock(PublisherSchema);

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
  });

  test("insert, select, ane parse", async () => {
    const articleArbitary = ZodFastCheck()
      .inputOf(ArticleSchema)
      .map((article) => ({
        ...article,
        id: faker.string.nanoid(6),
        is_enabled: +article.is_enabled,
        publisher_id: mockPublisher.id,
      }));

    await fc.assert(
      fc.asyncProperty(articleArbitary, async (article) => {
        article.id = faker.string.nanoid(6);

        const result = await Ky.insertInto("articles")
          .values({
            id: article.id,
            thumbnail: article.thumbnail,
            title: article.title,
            summary: article.summary,
            is_enabled: article.is_enabled,
            publisher_id: article.publisher_id,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(ArticleSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("articles").where("id", "=", result.id).execute();
      })
    );
  });
});
