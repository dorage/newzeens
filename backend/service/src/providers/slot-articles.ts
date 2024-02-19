import { Ky } from "../libs/kysely";

const selectSlot = (slotId: number) => {
  return Ky.selectFrom("slot_articles").selectAll().where("slot_id", "=", slotId).execute();
};

const SlotArticleProvider = {
  selectSlot,
};

export default SlotArticleProvider;
