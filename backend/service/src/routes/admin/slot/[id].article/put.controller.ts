import SlotArticleProvider from "@/src/providers/slot-articles";
import { zParam, zJson, zRes } from "./put";
import { z } from "zod";
import { deleteSlotArticle, insertSlotArticle, updateSlotArticle } from "./put.model";

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
  const articleIds = Object.getOwnPropertyNames(query.json);

  const promises = articleIds.map(async (articleId) => {
    const value = refineValue(query.json[articleId]);

    // if it is boolean false
    if (value === false) {
      await deleteSlotArticle({ slotId, articleId });
      return;
    }

    // if it is boolean true, set as undefined
    const preferences = value === true ? undefined : value;

    try {
      // if slotArticle exists already, update existing one
      await SlotArticleProvider.selectSlotArticleById({ slotId, articleId });
      await updateSlotArticle({ slotId, articleId, preferences });
    } catch (err) {
      // if not slotArticle exists, insert new one
      await insertSlotArticle({ slotId, articleId, preferences });
    }
  });

  await Promise.all(promises);

  return zRes.parse(await SlotArticleProvider.selectSlotArticles(slotId));
};
