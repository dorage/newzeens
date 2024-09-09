import { SlotSchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { getMockCampaign } from "./campaign.mock";
import { getSlotArbitary } from "./slots.mock";

testingTransaction();

describe("zod schema test", () => {
  const mockCampaign = getMockCampaign();

  beforeAll(async () => {
    await Ky.insertInto("campaigns").values(mockCampaign).execute();

    await Ky.deleteFrom("slots").execute();
  });

  test("zod schema should match the db schema strictly", async () => {
    await fc.assert(
      fc.asyncProperty(getSlotArbitary(mockCampaign.id), async (slot) => {
        const result = await Ky.insertInto("slots")
          .values(slot)
          .returningAll()
          .executeTakeFirstOrThrow();

        expect(SlotSchema.strict().safeParse(result).success).toEqual(true);

        await Ky.deleteFrom("slots").where("id", "=", result.id).execute();
      })
    );
  });
});
