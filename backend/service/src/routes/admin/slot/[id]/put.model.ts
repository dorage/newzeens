import { Ky } from "@/src/libs/kysely";
import { SlotSchema } from "kysely-schema";
import { z } from "zod";
import { zJson } from "./put";

export const putSlot = async (query: {
  slotId: z.infer<typeof SlotSchema.shape.id>;
  data: z.infer<typeof zJson>;
}) => {
  await Ky.updateTable("slots")
    .set({
      ...query.data,
      is_enabled: query.data.is_enabled == null ? undefined : Number(query.data.is_enabled),
    })
    .where("id", "=", query.slotId)
    .execute();

  return true;
};
