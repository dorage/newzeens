import { CampaignSchema } from "@/src/schemas/campaigns";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { ZodFastCheck } from "zod-fast-check";

testingTransaction();

describe("campaigns schema test", () => {
  test("insert, select and parse", async () => {
    const campaignArbitary = ZodFastCheck().inputOf(CampaignSchema);

    await fc.assert(
      fc.asyncProperty(campaignArbitary, async (campaign) => {
        const result = await Ky.insertInto("campaigns")
          .values({
            id: campaign.id,
            name: campaign.name,
            description: campaign.description,
            comment: campaign.comment,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(CampaignSchema.safeParse(result).success).toBe(true);

        await Ky.deleteFrom("campaigns").where("id", "=", result.id).execute();
      })
    );
  });
});
