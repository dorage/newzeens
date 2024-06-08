import { Ky } from "@/src/libs/kysely";
import { PublisherSchema, SlotPublisherSchema, SlotSchema } from "kysely-schema";
import { z } from "zod";

type SlotPublisherModelQuery = {
  slotId: z.infer<typeof SlotSchema.shape.id>;
  publisherId: z.infer<typeof PublisherSchema.shape.id>;
  preferences?: z.infer<typeof SlotPublisherSchema.shape.preferences>;
};

export const insertSlotPublisher = async (query: SlotPublisherModelQuery) => {
  await Ky.insertInto("slot_publishers")
    .values({
      slot_id: query.slotId,
      publisher_id: query.publisherId,
      preferences: query.preferences,
    })
    .execute();

  return true;
};

export const updateSlotPublisher = async (query: SlotPublisherModelQuery) => {
  await Ky.updateTable("slot_publishers")
    .set({ preferences: query.preferences ?? null })
    .where("slot_id", "=", query.slotId)
    .where("publisher_id", "=", query.publisherId)
    .execute();

  return true;
};

export const deleteSlotPublisher = async (query: Omit<SlotPublisherModelQuery, "preferences">) => {
  await Ky.deleteFrom("slot_publishers")
    .where("slot_id", "=", query.slotId)
    .where("publisher_id", "=", query.publisherId)
    .execute();

  return true;
};
