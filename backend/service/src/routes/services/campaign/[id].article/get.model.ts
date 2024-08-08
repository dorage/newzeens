import { Ky } from "@/src/libs/kysely";
import { queryPublisherWithKeywords } from "@/src/providers/publishers";
import { sql } from "kysely";
import { zRes } from "./get";
import { ArticleSchema, PublisherSchema } from "kysely-schema";

export const getPublishersWithKeywords = async (query: { slotId: number; limit: number }) => {
  const result = await Ky.selectFrom((eb) =>
    eb.selectFrom("slot_publishers").selectAll().where("slot_id", "=", query.slotId).as("sp")
  )
    .leftJoin("publishers", "publishers.id", "sp.publisher_id")
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

const getArticlesWithKeywords = async (query: { slotId: number; limit: number }) => {
  const result = await Ky.selectFrom((eb) =>
    eb.selectFrom("slot_articles").selectAll().where("slot_id", "=", query.slotId).as("sa")
  )
    .leftJoin("articles", "articles.id", "sa.article_id")
    .leftJoin(
      (eb) =>
        eb
          .selectFrom((eb) =>
            eb.selectFrom("slot_articles").selectAll().where("slot_id", "=", query.slotId).as("sa")
          )
          .leftJoin("articles", "articles.id", "sa.article_id")
          .leftJoin("publishers", "publishers.id", "articles.publisher_id")
          .leftJoin(
            "keyword_publisher_rels",
            "keyword_publisher_rels.publisher_id",
            "publishers.id"
          )
          .leftJoin(
            "keyword_groups",
            "keyword_groups.id",
            "keyword_publisher_rels.keyword_group_id"
          )
          .leftJoin("keywords", "keywords.id", "keyword_publisher_rels.keyword_id")
          .groupBy("publishers.id")
          .select([
            ...(Object.keys(PublisherSchema.shape).map((key) => `publishers.${key}`) as any),
            sql`JSON_GROUP_ARRAY(JSON_OBJECT(
    			'keyword_id', keywords.id, 'keyword_name', keywords.name, 'keyword_group_id', keyword_groups.id, 'keyword_group_name', keyword_groups.name
    ))`.as("keywords"),
          ])
          .as("p"),
      (eq) => eq.onRef("articles.publisher_id", "=", "p.id")
    )
    // .selectAll()
    .select([
      ...(Object.keys(ArticleSchema.shape).map((key) => `articles.${key}`) as any),
      sql`JSON_OBJECT(
    	'keywords', p.keywords,
			'id', p.id,
			'thumbnail', p.thumbnail,
			'name', p.name,
			'description', p.description,
			'subscriber', p.subscriber,
			'url_main', p.url_main,
			'url_subscribe', p.url_subscribe,
			'publisher_main', p.publisher_main,
			'publisher_spec', p.publisher_spec,
			'is_enabled', p.is_enabled,
			'created_at', p.created_at
    )`.as("publisher"),
    ])
    .limit(query.limit)
    .execute();
  return result;
};

export const getCampaignById = async (query: { campaignId: number }) => {
  return Ky.selectFrom("campaigns")
    .select(["id", "name"])
    .where("id", "=", query.campaignId)
    .executeTakeFirst();
};

export const getCampaignArticles = async (query: { campaignId: number; limit: number }) => {
  const campaign = await getCampaignById(query);
  if (campaign == null) throw new Error("campaign not found");

  const slots = await Ky.selectFrom("slots")
    .selectAll()
    .where("campaign_id", "=", query.campaignId)
    .orderBy("preferences desc")
    .execute();

  await Promise.all(
    slots.map((slot: any) =>
      getArticlesWithKeywords({ slotId: slot.id, ...query }).then((articles) => {
        slot.articles = articles;
      })
    )
  );

  return zRes.parse({ ...campaign, slots });
};
