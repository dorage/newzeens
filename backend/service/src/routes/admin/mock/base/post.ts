import { faker } from "@faker-js/faker";
import { Ky } from "@/src/libs/kysely";
import { createUniqueId } from "@/src/libs/nanoid";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zRes = z.object({
  okay: z.boolean(),
});

const route = createRoute({
  path: "",
  tags: ["Mock"],
  method: "post",
  summary: "",
  description: "",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: zRes,
        },
      },
      description: "",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

const iterate = (n: number) => async (iteratee: (n: number) => any) => {
  for (let i = 0; i < n; i++) {
    try {
      await iteratee(i);
    } catch (err) {
      console.error(`[${i} th Error]`, err);
    }
  }
};

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  try {
    // generate keywords
    await iterate(10)(async () => {
      await Ky.insertInto("keywords")
        .values({
          name: faker.company.buzzNoun(),
          is_enabled: faker.number.int({ min: 0, max: 1 }),
        })
        .execute();

      await Ky.insertInto("keyword_groups")
        .values({
          name: faker.company.buzzAdjective(),
          is_enabled: faker.number.int({ min: 0, max: 1 }),
        })
        .execute();
    });

    // generate publishers & articles
    await iterate(20)(async () => {
      const publisher = await Ky.insertInto("publishers")
        .values({
          id: createUniqueId(),
          name: faker.company.name(),
          description: faker.company.catchPhrase(),
          is_enabled: faker.number.int({ min: 0, max: 1 }),
          url_subscribe: faker.internet.url(),
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      iterate(20)(async () => {
        await Ky.insertInto("articles")
          .values({
            id: createUniqueId(),
            title: faker.commerce.productName(),
            summary: faker.commerce.productDescription(),
            is_enabled: faker.number.int({ min: 0, max: 1 }),
            publisher_id: publisher?.id,
          })
          .execute();
      });
    });
  } catch (err) {}

  return c.json({ okay: true });
});

export default app;
