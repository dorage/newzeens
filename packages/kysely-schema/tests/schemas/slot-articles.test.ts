import {
  ArticleSchema,
  CampaignSchema,
  PublisherSchema,
  SlotArticleSchema,
  SlotSchema,
} from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import { generateMock } from "@anatine/zod-mock";
import { faker } from "@faker-js/faker";
import { error } from "console";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("slot_articles schema test", () => {
  const mockPublisher = generateMock(PublisherSchema);
  const mockCampaign = generateMock(CampaignSchema);

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
    await Ky.insertInto("campaigns")
      .values({
        id: mockCampaign.id,
        name: mockCampaign.name,
        description: mockCampaign.description,
        comment: mockCampaign.comment,
      })
      .execute();
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
    const slotArbitary = ZodFastCheck()
      .inputOf(SlotSchema)
      .map((slot) => ({ ...slot, campaign_id: mockCampaign.id, is_enabled: +slot.is_enabled }));

    await fc.assert(
      fc.asyncProperty(articleArbitary, slotArbitary, async (article, slot) => {
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

        await Ky.insertInto("slots")
          .values({
            id: slot.id,
            campaign_id: slot.campaign_id,
            name: slot.name,
            description: slot.description,
            comment: slot.comment,
            preferences: slot.preferences,
            is_enabled: slot.is_enabled,
          })
          .execute();

        const result = await Ky.insertInto("slot_articles")
          .values({
            slot_id: slot.id,
            article_id: article.id,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(SlotArticleSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("articles").where("id", "=", result.article_id).execute();
        await Ky.deleteFrom("slots").where("id", "=", result.slot_id).execute();
      })
    );
  });
});
