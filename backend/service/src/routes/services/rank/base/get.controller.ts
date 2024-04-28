import { z } from "@hono/zod-openapi";
import { PublisherSchema } from "kysely-schema";
import { zRes } from "./get";
import { getPublisherRank } from "./get.model";

export const controller = async (query: {
  limit: number;
  lastPublisherId?: z.infer<typeof PublisherSchema.shape.id>;
  keyword?: string;
}) => {
  const ranks = await getPublisherRank(query);

  return zRes.parse(ranks);
};
