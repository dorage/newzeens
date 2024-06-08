import { Ky } from "@/src/libs/kysely";
import { SlotSchema } from "kysely-schema";
import { z } from "zod";

export const deleteSlot = async (query: { slotId: z.infer<typeof SlotSchema.shape.id> }) => {
  await Ky.deleteFrom("slots").where("id", "=", query.slotId).execute();
  return true;
};
