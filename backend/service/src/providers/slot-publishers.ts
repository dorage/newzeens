import { PublisherSchema, SlotSchema } from "kysely-schema";
import { z } from "zod";
import { Ky } from "../libs/kysely";

const selectSlotPublishers = (slotId: number) =>
  Ky.selectFrom((eq) =>
    eq.selectFrom("slot_publishers").selectAll().where("slot_id", "=", slotId).as("sp")
  )
    .leftJoin("publishers", "sp.publisher_id", "publishers.id")
    .selectAll()
    .orderBy("preferences desc")
    .execute();

const selectSlotPublisherById = (options: {
  slotId: z.infer<typeof SlotSchema.shape.id>;
  publisherId: z.infer<typeof PublisherSchema.shape.id>;
}) =>
  Ky.selectFrom("slot_publishers")
    .selectAll()
    .where("slot_id", "=", options.slotId)
    .where("publisher_id", "=", options.publisherId)
    .executeTakeFirstOrThrow();

const SlotPublisherProvider = {
  selectSlotPublishers,
  selectSlotPublisherById,
};

export default SlotPublisherProvider;
