import {
  KeywordGroupSchema,
  KeywordPublisherRelSchema,
  KeywordSchema,
  PublisherSchema,
} from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import { generateMock } from "@anatine/zod-mock";
import { faker } from "@faker-js/faker";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("keyword_publisher_rels schema test", () => {
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
    const publisherArbitary = ZodFastCheck()
      .inputOf(PublisherSchema)
      .map((publisher) => ({
        ...publisher,
        id: faker.string.nanoid(6),
        is_enabled: +publisher.is_enabled,
      }));
    const keywordArbitary = ZodFastCheck()
      .inputOf(KeywordSchema)
      .map((keyword) => ({
        ...keyword,
        is_enabled: +keyword.is_enabled,
        keyword_group_id: mockKeywordGroup.id,
      }));

    await fc.assert(
      fc.asyncProperty(publisherArbitary, keywordArbitary, async (publisher, keyword) => {
        publisher.id = faker.string.nanoid(6);
        await Ky.insertInto("publishers")
          .values({
            id: publisher.id,
            thumbnail: publisher.thumbnail,
            name: publisher.name,
            description: publisher.description,
            subscriber: publisher.subscriber,
            url_subscribe: publisher.url_subscribe,
            publisher_main: publisher.publisher_main,
            publisher_spec: publisher.publisher_spec,
            is_enabled: publisher.is_enabled,
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

        const result = await Ky.insertInto("keyword_publisher_rels")
          .values({
            keyword_group_id: mockKeywordGroup.id,
            keyword_id: keyword.id,
            publisher_id: publisher.id,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(KeywordPublisherRelSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("publishers").where("id", "=", result.publisher_id).execute();
        await Ky.deleteFrom("keywords").where("id", "=", result.keyword_id).execute();
      })
    );
  });
});
