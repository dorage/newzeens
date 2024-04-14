import { CampaignSchema } from "@/src/schemas/campaigns";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("campaigns schema test", () => {
  test("Insert", async () => {
    const campaignArbitary = ZodFastCheck().inputOf(CampaignSchema);

    await fc.assert(
      fc.asyncProperty(campaignArbitary, async (campaign) => {
        await expect(
          Ky.insertInto("campaigns").values({
            id: campaign.id,
            name: campaign.name,
            description: campaign.description,
            comment: campaign.comment,
          }).execute
        ).rejects.toThrow(undefined);
      })
    );
  });

  test("Select", async () => {
    const campaigns = await Ky.selectFrom("campaigns").selectAll().execute();

    expect(campaigns.every((campaign) => CampaignSchema.safeParse(campaign).success)).toBe(true);
  });
});
