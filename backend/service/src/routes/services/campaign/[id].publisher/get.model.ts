import { Ky } from "@/src/libs/kysely";
import { queryPublisherWithKeywords } from "@/src/providers/publishers";
import { sql } from "kysely";
import { zRes } from "./get";

export const getCampaignPublisher = async (query: { campaignId: number; limit: number }) => {
  const publisherQuery = await queryPublisherWithKeywords();

  const campaignArticles = await Ky.selectFrom((eb) =>
    eb
      .selectFrom("slots")
      .leftJoin(
        (eb) =>
          eb.selectFrom("campaigns").selectAll().where("id", "=", query.campaignId).as("campaigns"),
        (join) => join.onRef("slots.campaign_id", "=", "campaigns.id")
      )
      .leftJoin(
        (eb) =>
          eb
            .selectFrom("publishers")
            .leftJoin(
              (eb) =>
                eb
                  .selectFrom("slot_publishers")
                  .selectAll()
                  .orderBy("preferences desc")
                  .as("slot_publishers"),
              (join) => join.onRef("publishers.id", "=", "slot_publishers.publisher_id")
            )
            .leftJoin(
              (eb) => publisherQuery(eb as any).as("pq"),
              (join) => join.onRef("pq.id", "=", "publishers.id")
            )
            .select(() => [
              sql`publishers.id`.as("id"),
              sql<number>`ROW_NUMBER () OVER ( 
								PARTITION BY slot_publishers.slot_id
								ORDER BY slot_publishers.preferences
							)`.as("idx"),
              sql`slot_publishers.slot_id`.as("slot_id"),
              sql`JSON_OBJECT(
							'id', publishers.id,
							'name', publishers.name,
							'description', publishers.description,
							'thumbnail', publishers.thumbnail,
							'preferences', slot_publishers.preferences,
							'keywords', pq.keywords
						)`.as("publisher"),
            ])
            .as("a"),
        (join) => join.onRef("a.slot_id", "=", "slots.id")
      )
      .select(() => [
        sql<string>`campaigns.id`.as("id"),
        sql<string>`campaigns.name`.as("name"),
        sql<{ publishers: any[] }[]>`JSON_OBJECT(
							'id', slots.id,
							'name', slots.name,
							'preferences', slots.preferences,
							'publishers', JSON_GROUP_ARRAY(a.publisher)
						)`.as("slot"),
      ])
      .where("slots.campaign_id", "=", query.campaignId)
      .where("a.idx", "<=", query.limit)
      .orderBy("slots.preferences desc")
      .groupBy("slots.id")
      .as("c")
  )
    .groupBy("c.id")
    .select(() => [
      sql<string>`c.id`.as("id"),
      sql<string>`c.name`.as("name"),
      sql<any[]>`JSON_GROUP_ARRAY(c.slot)`.as("slots"),
    ])
    .executeTakeFirstOrThrow();

  return zRes.parse(campaignArticles);
};
