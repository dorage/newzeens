import { Ky } from "@/src/libs/kysely";
import { sql } from "kysely";
import { PublisherSchema } from "kysely-schema";

export const getPublishersWithSearchTerm = async (query: { term: string; limit: number }) => {
  const result = await Ky.selectFrom((eb) =>
    eb
      .selectFrom("publishers")
      .selectAll()
      .where("name", "like", `%${query.term}%`)
      .as("publishers")
  )
    .leftJoin("keyword_publisher_rels", "keyword_publisher_rels.publisher_id", "publishers.id")
    .leftJoin("keyword_groups", "keyword_groups.id", "keyword_publisher_rels.keyword_group_id")
    .leftJoin("keywords", "keywords.id", "keyword_publisher_rels.keyword_id")
    .groupBy("publishers.id")
    .select([
      ...(Object.keys(PublisherSchema.shape).map((key) => `publishers.${key}`) as any),
      sql`JSON_GROUP_ARRAY(JSON_OBJECT(
						'keyword_id', keywords.id, 'keyword_name', keywords.name, 'keyword_group_id', keyword_groups.id, 'keyword_group_name', keyword_groups.name
			))`.as("keywords"),
    ])
    .limit(query.limit)
    .execute();
  return result;
};
