import { Ky } from "@/src/libs/kysely";
import { zQuery } from "./get";
import { z } from "zod";

export const retreiveArticles = async (query: z.infer<typeof zQuery>) => {
  // keyword 에 따라
  // keyword + search term에 따라
  // is_enalbed 에 따라
  // page size / limit 에 따라
  const articles = await Ky.selectFrom("articles")
    .selectAll()
    .where((eb) => {
      const conditions = [];
      if (query.name) conditions.push(eb("title", "like", `%${query.name}%`));
      if (query.is_enabled) conditions.push(eb("is_enabled", "=", query.is_enabled));
      if (query.publisher_id) conditions.push(eb("publisher_id", "=", query.publisher_id));
      return eb.and(conditions);
    })
    .limit(query.limit)
    .offset(query.page * query.limit)
    .orderBy("created_at", "desc")
    .execute();

  return articles;
};
