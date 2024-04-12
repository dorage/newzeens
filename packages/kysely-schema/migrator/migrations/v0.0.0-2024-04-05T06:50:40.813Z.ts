import { faker } from "@faker-js/faker";
import { Kysely } from "kysely";
import { DB } from "@/src/index";
import { generateArticleId, generatePublisherId } from "../libs/nanoid";
import { MOCK_DATA } from "../mock";

/* insert mock data
 * */

export async function up(db: Kysely<DB>): Promise<void> {
  if (process.env.NODE_ENV === "production") return;
  const KEYWORD_GROUPS = MOCK_DATA["v0.0.0"].KEYWORD_GROUPS;
  const kEYWORD_GROUP_NAMES = Object.keys(KEYWORD_GROUPS) as (keyof typeof KEYWORD_GROUPS)[];
  const PUBLISHERS = MOCK_DATA["v0.0.0"].PUBLISHERS;

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
    const publisherId = generatePublisherId();

    await db
      .insertInto("publishers")
      .values({
        id: publisherId,
        thumbnail: `https://picsum.photos/seed/${publisherId}/200/300`,
        name: publisher.name,
        description: publisher.desc,
        subscriber: faker.number.int({ min: 500, max: 500000 }),
        url_subscribe: publisher["구독하기"],
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
      await db
        .insertInto("articles")
        .values({
          id: generateArticleId(),
          title: faker.lorem.sentence(2),
          summary: faker.lorem.paragraphs(3),
          is_enabled: 1,
          publisher_id: publisherId,
        })
        .execute();
    }
  }
}

export async function down(db: Kysely<DB>): Promise<void> {
  if (process.env.NODE_ENV === "production") return;

  await db.deleteFrom("keywords").execute();
  await db.deleteFrom("keyword_groups").execute();

  await db.deleteFrom("articles").execute();
  await db.deleteFrom("keyword_publisher_rels").execute();
  await db.deleteFrom("keywords").execute();
  await db.deleteFrom("keyword_groups").execute();
}
