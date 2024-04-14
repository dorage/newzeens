import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { createUniqueId } from "@/src/libs/nanoid";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PublisherSchema } from "kysely-schema";

export const zJson = z.object({
  name: PublisherSchema.shape.name.openapi({ example: "" }),
  description: PublisherSchema.shape.description.openapi({ example: "" }),
  subscriber: PublisherSchema.shape.subscriber.openapi({ example: 0 }),
  thumbnail: PublisherSchema.shape.thumbnail.openapi({ example: "https://example.com" }),
  url_subscribe: PublisherSchema.shape.url_subscribe.openapi({ example: "https://example.com" }),
  publisher_main: PublisherSchema.shape.publisher_main.openapi({ example: "https://example.com" }),
  publisher_spec: PublisherSchema.shape.publisher_spec.openapi({ example: "https://example.com" }),
  is_enabled: z.boolean().openapi({ example: true }),
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
