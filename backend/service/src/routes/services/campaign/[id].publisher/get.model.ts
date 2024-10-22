import { Ky } from "@/src/libs/kysely";
import { sql } from "kysely";
import { PublisherSchema } from "kysely-schema";
import { zRes } from "./get";

export const getPublishersWithKeywords = async (query: { slotId: number; limit: number }) => {
  const result = await Ky.selectFrom((eb) =>
    eb.selectFrom("slot_publishers").selectAll().where("slot_id", "=", query.slotId).as("sp")
  )
    .leftJoin("publishers", "publishers.id", "sp.publisher_id")
    .leftJoin("keyword_publisher_rels", "keyword_publisher_rels.publisher_id", "publishers.id")
    .leftJoin("keyword_groups", "keyword_groups.id", "keyword_publisher_rels.keyword_group_id")
    .leftJoin("keywords", "keywords.id", "keyword_publisher_rels.keyword_id")
    .groupBy("publishers.id")
    .where("publishers.is_enabled", "=", 1)
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

export const getCampaignById = async (query: { campaignId: number }) => {
  return Ky.selectFrom("campaigns")
    .select(["id", "name"])
    .where("id", "=", query.campaignId)
    .executeTakeFirst();
};

export const getCampaignPublisher = async (query: { campaignId: number; limit: number }) => {
  const campaign = await getCampaignById(query);
  if (campaign == null) throw new Error("campaign not found");

  const slots = await Ky.selectFrom("slots")
    .selectAll()
    .where("campaign_id", "=", query.campaignId)
    .orderBy("preferences desc")
    .execute();

  await Promise.all(
    slots.map((slot: any) =>
      getPublishersWithKeywords({ slotId: slot.id, ...query }).then((publishers) => {
        slot.publishers = publishers;
      })
    )
  );

  return zRes.parse({
    ...campaign,
    slots,
  });
};
