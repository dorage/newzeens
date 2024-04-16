import { CampaignSchema } from "@/src/schemas/campaigns";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { getCampaignArbitary } from "./campaign.mock";

testingTransaction();

describe("zod schema test", () => {
  beforeAll(async () => {
    await Ky.deleteFrom("campaigns").execute();
  });

  test("zod schema should match the db schema strictly", async () => {
    await fc.assert(
      fc.asyncProperty(getCampaignArbitary(), async (campaign) => {
        const result = await Ky.insertInto("campaigns")
          .values(campaign)
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(CampaignSchema.strict().safeParse(result).success).toEqual(true);

        await Ky.deleteFrom("campaigns").where("id", "=", result.id).execute();
      })
    );
  });
});
