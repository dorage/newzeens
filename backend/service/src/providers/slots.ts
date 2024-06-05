import { z } from "zod";
import { Ky } from "../libs/kysely";
import { SlotSchema } from "kysely-schema";

const selectSlots = (campaignId: number) => {
  return Ky.selectFrom("slots")
    .selectAll()
    .where("campaign_id", "=", campaignId)
    .orderBy("preferences desc")
    .execute();
};

const selectSlotById = (slotId: z.infer<typeof SlotSchema.shape.id>) =>
  Ky.selectFrom("slots").selectAll().where("id", "=", slotId).executeTakeFirstOrThrow();

const SlotProvider = {
  selectSlots,
  selectSlotById,
};

export default SlotProvider;
