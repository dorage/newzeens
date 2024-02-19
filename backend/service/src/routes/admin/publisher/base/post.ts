import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { createUniqueId } from "@/src/libs/nanoid";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { PublisherSchema } from "kysely-schema";

export const zJson = z.object({
  name: PublisherSchema.shape.name,
  description: PublisherSchema.shape.description,
  subscriber: PublisherSchema.shape.subscriber,
  thumbnail: PublisherSchema.shape.thumbnail,
  url_subscribe: PublisherSchema.shape.url_subscribe,
  publisher_main: PublisherSchema.shape.publisher_main,
  publisher_spec: PublisherSchema.shape.publisher_spec,
  is_enabled: z.boolean(),
});

export const zRes = OpenAPISchema.AdminPublisher;

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "publisher 추가",
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
            publisher_main: "글 잘쓰는 메인",
            publisher_spec: "글 잘쓰는 서브",
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
      description: "AdminPublisher 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const json = zJson.parse(await c.req.json());

  const publisher = await Ky.insertInto("publishers")
    .values({
      id: createUniqueId(),
      name: json.name,
      description: json.description,
      url_subscribe: json.url_subscribe,
      thumbnail: json.thumbnail,
      publisher_main: json.publisher_main,
      publisher_spec: json.publisher_spec,
      is_enabled: +json.is_enabled,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return c.json(publisher);
});

export default app;
