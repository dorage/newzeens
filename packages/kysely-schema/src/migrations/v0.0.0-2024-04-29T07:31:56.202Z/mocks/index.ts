import { faker } from "@faker-js/faker";
import { Kysely, sql } from "kysely";
import type { DB } from "../index";
import { CAMPAIGNS } from "./data/campaign";
import { KEYWORD_GROUPS } from "./data/keyword-groups";
import { PUBLISHERS } from "./data/publisher";
import { SLOTS } from "./data/slot";

export const insert = async (db: Kysely<DB>) => {
  const kEYWORD_GROUP_NAMES = Object.keys(KEYWORD_GROUPS) as (keyof typeof KEYWORD_GROUPS)[];

  // insert keyword groups
  for (const keywordGroupName of kEYWORD_GROUP_NAMES) {
    const keywordGroup = await db
      .insertInto("keyword_groups")
      .values({ name: keywordGroupName, is_enabled: 1 })
      .returningAll()
      .executeTakeFirstOrThrow();

    // insert keywords into the above keyword group
    for (const keywordName of KEYWORD_GROUPS[keywordGroupName]) {
      await db
        .insertInto("keywords")
        .values({ keyword_group_id: keywordGroup.id, name: keywordName, is_enabled: 1 })
        .execute();
    }
  }

  for (const publisher of PUBLISHERS) {
    const publisherId = faker.string.fromCharacters("abcdefghijklmnopqrstuvwxyz", 6);

    await db
      .insertInto("publishers")
      .values({
        id: publisherId,
        thumbnail: `https://picsum.photos/seed/${publisherId}/200/300`,
        name: publisher.name,
        description: publisher.description,
        subscriber: faker.number.int({ min: 500, max: 500000 }),
        url_main: publisher.url_main,
        url_subscribe: publisher.url_subscribe,
        publisher_main: publisher.publisher_main,
        publisher_spec: publisher.publisher_spec,
        is_enabled: 1,
      })
      .execute();

    // insert publisher relation with keyword & keyword groups
    for (const keywordGroupName of kEYWORD_GROUP_NAMES) {
      const keywordGroup = await db
        .selectFrom("keyword_groups")
        .selectAll()
        .where("name", "=", keywordGroupName)
        .executeTakeFirstOrThrow();

      const keyword = await db
        .selectFrom("keywords")
        .selectAll()
        .where("keyword_group_id", "=", keywordGroup.id)
        .where("name", "=", publisher[keywordGroupName])
        .executeTakeFirstOrThrow();

      await db
        .insertInto("keyword_publisher_rels")
        .values({
          keyword_group_id: keywordGroup.id,
          keyword_id: keyword.id,
          publisher_id: publisherId,
        })
        .execute();
    }

    for (let i = 0; i < 10; i++) {
      const articleId = faker.string.fromCharacters("abcdefghijklmnopqrstuvwxyz", 6);
      await db
        .insertInto("articles")
        .values({
          id: articleId,
          title: faker.lorem.sentence(2),
          url: faker.internet.url({ protocol: "https" }),
          summary: faker.lorem.paragraphs(3),
          is_enabled: 1,
          publisher_id: publisherId,
        })
        .execute();
    }
  }

  for (const mockCampaign of CAMPAIGNS) {
    const campaign = await db
      .insertInto("campaigns")
      .values({
        name: mockCampaign.name,
        description: mockCampaign.description,
        comment: mockCampaign.comment,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    for (const mockSlot of SLOTS[mockCampaign.name]) {
      const slot = await db
        .insertInto("slots")
        .values({
          campaign_id: campaign.id,
          name: mockSlot.name,
          description: mockSlot.description,
          comment: mockSlot.comment,
          preferences: mockSlot.preferences,
          is_enabled: 1,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      const articles = await db
        .selectFrom("articles")
        .selectAll()
        .orderBy(sql`RANDOM()`)
        .limit(10)
        .execute();

      await db
        .insertInto("slot_articles")
        .values(articles.map((article) => ({ slot_id: slot.id, article_id: article.id })))
        .execute();

      const publishers = await db
        .selectFrom("publishers")
        .selectAll()
        .orderBy(sql`RANDOM()`)
        .limit(10)
        .execute();

      await db
        .insertInto("slot_publishers")
        .values(publishers.map((publisher) => ({ slot_id: slot.id, publisher_id: publisher.id })))
        .execute();
    }
  }
};
