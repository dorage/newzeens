import { SlotPublisherSchema } from "@/src/index";
import { Ky, testingTransaction } from "@/tests/libs/kysely";
import fc from "fast-check";
import { getMockCampaign } from "./campaign.mock";
import { getPublisherArbitary } from "./publishers.mock";
import { getSlotArbitary } from "./slots.mock";

testingTransaction();

describe("slot_publishers schema test", () => {
  const mockCampaign = getMockCampaign();

  beforeAll(async () => {
    await Ky.insertInto("campaigns").values(mockCampaign).execute();
  });

  test("zod schema should match the db schema strictly", async () => {
    await fc.assert(
      fc.asyncProperty(
        getPublisherArbitary(),
        getSlotArbitary(mockCampaign.id),
        async (publisher, slot) => {
          await Ky.insertInto("publishers").values(publisher).execute();
          await Ky.insertInto("slots").values(slot).execute();

          const result = await Ky.insertInto("slot_publishers")
            .values({
              slot_id: slot.id,
              publisher_id: publisher.id,
            })
            .returningAll()
            .executeTakeFirstOrThrow();

          expect(SlotPublisherSchema.strict().safeParse(result).success).toEqual(true);

          await Ky.deleteFrom("publishers").where("id", "=", result.publisher_id).execute();
          await Ky.deleteFrom("slots").where("id", "=", result.slot_id).execute();
        }
      )
    );
  });
});
