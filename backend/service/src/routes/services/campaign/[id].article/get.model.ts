import { Ky } from "@/src/libs/kysely";
import { queryPublisherWithKeywords } from "@/src/providers/publishers";
import { sql } from "kysely";
import { zRes } from "./get";

export const getCampaignArticles = async (query: { campaignId: number; limit: number }) => {
  const publisherQuery = await queryPublisherWithKeywords();

  const campaignArticles = await Ky.selectFrom((eb) =>
    eb
      .selectFrom("slots")
      .leftJoin(
        (eb) => eb.selectFrom("campaigns").selectAll().as("campaigns"),
        (join) => join.onRef("slots.campaign_id", "=", "campaigns.id")
      )
      .leftJoin(
        (eb) =>
          eb
            .selectFrom("articles")
            .leftJoin(
              (eb) =>
                eb
                  .selectFrom("slot_articles")
                  .selectAll()
                  .orderBy("preferences desc")
                  .as("slot_articles"),
              (join) => join.onRef("articles.id", "=", "slot_articles.article_id")
            )
            .leftJoin(
              (eb) => publisherQuery(eb as any).as("pq"),
              (join) => join.onRef("pq.id", "=", "articles.publisher_id")
            )
            .leftJoin(
              (eb) => eb.selectFrom("publishers").selectAll().as("p"),
              (join) => join.onRef("articles.publisher_id", "=", "p.id")
            )
            .select(() => [
              sql`articles.id`.as("id"),
              sql<number>`ROW_NUMBER () OVER ( PARTITION BY slot_articles.slot_id ORDER BY slot_articles.preferences )`.as(
                "idx"
              ),
              sql`slot_articles.slot_id`.as("slot_id"),
              sql`JSON_OBJECT(
							'id', articles.id,
							'title', articles.title,
							'thumbnail', articles.thumbnail,
							'created_at', articles.created_at,
							'preferences', slot_articles.preferences,
							'publisher', JSON_OBJECT(
								'id', p.id,
								'name', p.name,
								'keywords', pq.keywords
							)
						)`.as("article"),
            ])
            .as("a"),
        (join) => join.onRef("a.slot_id", "=", "slots.id")
      )
      .select(() => [
        // sql<string>`length`.as("length"),
        sql<string>`campaigns.id`.as("id"),
        sql<string>`campaigns.name`.as("name"),
        sql<{ articles: any[] }[]>`JSON_OBJECT(
							'id', slots.id,
							'name', slots.name,
							'preferences', slots.preferences,
							'articles', JSON_GROUP_ARRAY(a.article)
						)`.as("slot"),
      ])
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
