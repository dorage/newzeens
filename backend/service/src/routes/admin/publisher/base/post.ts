import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { createUniqueId } from "@/src/libs/nanoid";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { PublisherSchema } from "kysely-schema";

export const zJson = z.object({
  name: PublisherSchema.shape.name,
  description: PublisherSchema.shape.description,
  subscriber: PublisherSchema.shape.subscriber,
  thumbnail: PublisherSchema.shape.thumbnail,
  url_subscribe: PublisherSchema.shape.url_subscribe,
  is_enabled: z.boolean(),
});

export const zRes = PublisherSchema;

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "",
  description: "",
  request: {
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            thumbnail: "www.thumbnail.com",
            name: "테스터 뉴스레터",
            description: "테스터 뉴스레터 입니당",
            subscriber: 1000,
            is_enabled: true,
            url_subscribe: "www.subscribe.com",
          }),
        },
      },
      required: true,
    },
  },
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

app.use(route.getRoutingPath(), zValidator("json", zJson));

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const json = c.req.valid("json");

  const publisher = await Ky.insertInto("publishers")
    .values({
      id: createUniqueId(),
      name: json.name,
      description: json.description,
      url_subscribe: json.url_subscribe,
      thumbnail: json.thumbnail,
      is_enabled: +json.is_enabled,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return c.json(publisher);
});

export default app;
