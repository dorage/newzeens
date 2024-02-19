import { Ky } from "../libs/kysely";

const selectSlots = (campaignId: number) => {
  return Ky.selectFrom("slots")
    .selectAll()
    .where("campaign_id", "=", campaignId)
    .orderBy("preferences desc")
    .execute();
};

const SlotProvider = {
  selectSlots,
};

export default SlotProvider;
