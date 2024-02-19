import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { PublisherSchema } from "kysely-schema";

export const zParams = z.object({
  id: PublisherSchema.shape.id,
});

export const zJson = z.object({
  thumbnail: PublisherSchema.shape.thumbnail.optional(),
  name: PublisherSchema.shape.name.optional(),
  description: PublisherSchema.shape.description.optional(),
  subscriber: PublisherSchema.shape.subscriber.optional(),
  is_enabled: PublisherSchema.shape.is_enabled.optional(),
  url_subscribe: PublisherSchema.shape.url_subscribe.optional(),
  publisher_main: PublisherSchema.shape.publisher_main.optional(),
  publisher_spec: PublisherSchema.shape.publisher_spec.optional(),
});

export const zRes = OpenAPISchema.AdminPublisher;

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "publisher 정보 수정",
  description: "",
  request: {
    params: zParams,
    body: {
      description: "모든 필드는 옵셔널",
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
            publisher_main: "글쓰는 사람 메인",
            publisher_spec: "글쓰는 사람 서브",
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

app.use(route.getRoutingPath(), zValidator("json", zJson));

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const params = zParams.parse(c.req.param());
  const json = zJson.parse(await c.req.json());

  const res = await Ky.updateTable("publishers")
    .set((eb) => {
      const update: any = {};
      if (json.thumbnail != null) update.thumbnail = json.thumbnail;
      if (json.name != null) update.name = json.name;
      if (json.description != null) update.description = json.description;
      if (json.subscriber != null) update.subscriber = json.subscriber;
      if (json.is_enabled != null) update.is_enabled = +json.is_enabled;
      if (json.url_subscribe != null) update.url_subscribe = json.url_subscribe;
      if (json.publisher_main != null) update.publisher_main = json.publisher_main;
      if (json.publisher_spec != null) update.publisher_spec = json.publisher_spec;
      return update;
    })
    .where("id", "=", params.id)
    .returningAll()
    .executeTakeFirst();

  return c.json(zRes.parse(res));
});

export default app;
