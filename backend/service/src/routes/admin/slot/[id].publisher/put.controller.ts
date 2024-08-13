import SlotPublisherProvider from "@/src/providers/slot-publishers";
import { zParam, zJson, zRes } from "./put";
import { z } from "zod";
import { deleteSlotPublisher, insertSlotPublisher, updateSlotPublisher } from "./put.model";

const refineValue = (v: any) => {
  if (v == null) return false;
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v;
  return Boolean(v);
};

export const controller = async (query: {
  param: z.infer<typeof zParam>;
  json: z.infer<typeof zJson>;
}) => {
  const slotId = query.param.id;
  const publisherIds = Object.getOwnPropertyNames(query.json);

  const promises = publisherIds.map(async (publisherId) => {
    const value = refineValue(query.json[publisherId]);

    // if it is boolean false
    if (value === false) {
      await deleteSlotPublisher({ slotId, publisherId });
      return;
    }

    // if it is boolean true, set as undefined
    const preferences = value === true ? undefined : value;

    try {
      // if slotPublisher exists already, update existing one
      await SlotPublisherProvider.selectSlotPublisherById({ slotId, publisherId });
      await updateSlotPublisher({ slotId, publisherId, preferences });
    } catch (err) {
      // if not slotPublisher exists, insert new one
      await insertSlotPublisher({ slotId, publisherId, preferences });
    }
  });

  await Promise.all(promises);

  return zRes.parse(await SlotPublisherProvider.selectSlotPublishers(slotId));
};
