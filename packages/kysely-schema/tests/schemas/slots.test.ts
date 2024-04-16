import { CampaignSchema, SlotSchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import { generateMock } from "@anatine/zod-mock";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("slots schema test", () => {
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

  test("insert, select and parse", async () => {
    const slotArbitary = ZodFastCheck()
      .inputOf(SlotSchema)
      .map((slot) => ({ ...slot, campaign_id: mockCampaign.id, is_enabled: +slot.is_enabled }));

    await fc.assert(
      fc.asyncProperty(slotArbitary, async (slot) => {
        const result = await Ky.insertInto("slots")
          .values({
            campaign_id: slot.campaign_id,
            name: slot.name,
            description: slot.description,
            comment: slot.comment,
            preferences: slot.preferences,
            is_enabled: slot.is_enabled,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(SlotSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("slots").where("id", "=", result.id).execute();
      })
    );
  });
});
