import { Ky } from "../libs/kysely";

const selectPublisher = (slotId: number) => {
  return Ky.selectFrom("slot_publishers").selectAll().where("slot_id", "=", slotId).execute();
};

const SlotPublisherProvider = {
  selectPublisher,
};

export default SlotPublisherProvider;
