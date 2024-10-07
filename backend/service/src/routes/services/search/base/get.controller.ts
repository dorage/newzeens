import { z } from "@hono/zod-openapi";
import { zRes } from "./get";
import { getPublishersWithSearchTerm } from "./get.model";

export const controller = async (query: { term: string }): Promise<z.infer<typeof zRes>> => {
  const res = await getPublishersWithSearchTerm(query);

  return zRes.parse(res);
};
