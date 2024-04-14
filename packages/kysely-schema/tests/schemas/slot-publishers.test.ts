import { CampaignSchema, PublisherSchema, SlotPublisherSchema, SlotSchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import { generateMock } from "@anatine/zod-mock";
import { faker } from "@faker-js/faker";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("slot_publishers schema test", () => {
  const mockCampaign = generateMock(CampaignSchema);

  beforeAll(async () => {
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
    const publisherArbitary = ZodFastCheck()
      .inputOf(PublisherSchema)
      .map((publisher) => ({
        ...publisher,
        id: faker.string.nanoid(6),
        is_enabled: +publisher.is_enabled,
      }));
    const slotArbitary = ZodFastCheck()
      .inputOf(SlotSchema)
      .map((slot) => ({
        ...slot,
        campaign_id: mockCampaign.id,
        is_enabled: +slot.is_enabled,
      }));

    await fc.assert(
      fc.asyncProperty(publisherArbitary, slotArbitary, async (publisher, slot) => {
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

        const result = await Ky.insertInto("slot_publishers")
          .values({
            slot_id: slot.id,
            publisher_id: publisher.id,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(SlotPublisherSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("publishers").where("id", "=", result.publisher_id).execute();
        await Ky.deleteFrom("slots").where("id", "=", result.slot_id).execute();
      })
    );
  });
});
