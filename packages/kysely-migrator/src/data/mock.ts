import { faker } from "@faker-js/faker";
import { KEYWORD_GROUPS, PUBLISHERS } from ".";

import { customAlphabet } from "nanoid";
import { Ky } from "../libs/kysely";

const createUniqueId = customAlphabet("abcdefghkmnopqrstuxyz2345689", 6);

export const insertMockData = async () => {
  const keywordGroups = Object.keys(KEYWORD_GROUPS) as (keyof typeof KEYWORD_GROUPS)[];

  // insert keyword_groups
  for (const kg of keywordGroups) {
    await Ky.insertInto("keyword_groups").values({ name: kg, is_enabled: 1 }).execute();
  }

  // insert keywords
  {
    for (const kg of keywordGroups) {
      const v_kg = await Ky.selectFrom("keyword_groups")
        .select("id")
        .where("name", "=", kg)
        .executeTakeFirst();
      if (v_kg == null) continue;
      for (const k of KEYWORD_GROUPS[kg]) {
        await Ky.insertInto("keywords")
          .values({ keyword_group_id: v_kg.id, name: k, is_enabled: 1 })
          .execute();
      }
    }
  }

  // insert publisher
  {
    for (const p of PUBLISHERS) {
      const publisher_id = createUniqueId();
      // insert publisher
      await Ky.insertInto("publishers")
        .values({
          id: publisher_id,
          name: p.name,
          description: p.desc,
          thumbnail: `https://picsum.photos/seed/${publisher_id}/200/300`,
          subscriber: faker.number.int({ min: 500, max: 500000 }),
          is_enabled: 1,
          url_subscribe: p["구독하기"],
          publisher_main: p.publisher_main,
          publisher_spec: p.publisher_spec,
        })
        .execute();

      // insert keyword_publisher_rels
      {
        for (const kg of keywordGroups) {
          const v_kg = await Ky.selectFrom("keyword_groups")
            .selectAll()
            .where("name", "=", kg)
            .executeTakeFirstOrThrow();

          const v_k = await Ky.selectFrom("keywords")
            .selectAll()
            .where("keyword_group_id", "=", v_kg.id)
            .where("name", "=", p[kg])
            .executeTakeFirstOrThrow();

          await Ky.insertInto("keyword_publisher_rels")
            .values({
              keyword_group_id: v_kg.id,
              keyword_id: v_k.id,
              publisher_id: publisher_id,
            })
            .execute();
        }

        // insert articles
        {
          for (let i = 0; i < 10; i++) {
            const article_id = createUniqueId();
            await Ky.insertInto("articles")
              .values({
                id: article_id,
                title: faker.lorem.sentence(2),
                summary: faker.lorem.paragraphs(3),
                is_enabled: 1,
                publisher_id: publisher_id,
              })
              .execute();
          }
        }
      }
    }
  }
};
