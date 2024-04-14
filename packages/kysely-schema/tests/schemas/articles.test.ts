import { ArticleSchema } from "@/src/schemas/articles";
import { Ky } from "@/tests/libs/kysely";
import fc from "fast-check";
import { sql } from "kysely";
import { ZodFastCheck } from "zod-fast-check";
import { generateMock } from "@anatine/zod-mock";
import { PublisherSchema } from "@/src/index";

beforeAll(async () => {
  await sql`BEGIN TRANSACTION;`.execute(Ky);
});

afterAll(async () => {
  await sql`ROLLBACK TRANSACTION;`.execute(Ky);
});

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

  test("Insert", async () => {
    const articleArbitary = ZodFastCheck().inputOf(ArticleSchema);

    await fc.assert(
      fc.asyncProperty(articleArbitary, async (article) => {
        await expect(
          Ky.insertInto("articles").values({
            id: article.id,
            thumbnail: article.thumbnail,
            title: article.title,
            summary: article.summary,
            is_enabled: +article.is_enabled,
            publisher_id: mockPublisher.id,
          }).execute
        ).rejects.toThrow(undefined);
      })
    );
  });

  test("Select", async () => {
    const articles = await Ky.selectFrom("articles")
      .selectAll()
      .where("publisher_id", "=", mockPublisher.id)
      .execute();

    expect(articles.every((article) => ArticleSchema.safeParse(article).success)).toBe(true);
  });
});
