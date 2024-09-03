import "@/migrator/libs/dotenv";
import { Ky } from "@/migrator/libs/kysely";
import { faker } from "@faker-js/faker";
import { KEYWORD_GROUPS } from "./data/keyword-groups";
import { PUBLISHERS } from "./data/publisher";

export const insert = async () => {
  const db = Ky;
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
        subscriber: 0,
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
  }
  console.log("done");
};

insert();
