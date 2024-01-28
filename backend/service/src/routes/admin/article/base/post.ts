import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { createUniqueId } from "@/src/libs/nanoid";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { ArticleSchema } from "kysely-schema";
import moment from "moment";

export const zJson = z.object({
  thumbnail: ArticleSchema.shape.thumbnail,
  title: ArticleSchema.shape.title,
  summary: ArticleSchema.shape.summary,
  publisher_id: ArticleSchema.shape.publisher_id,
  is_enabled: ArticleSchema.shape.is_enabled,
});

export const zRes = ArticleSchema;

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
            title: "테스트 잘하는 방법",
            summary: "그런건 없다",
            publisher_id: "asdfgh",
            published_in: moment().toISOString(),
            is_enabled: true,
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

  const res = await Ky.insertInto("articles")
    .values({
      id: createUniqueId(),
      thumbnail: json.thumbnail,
      title: json.title,
      summary: json.summary,
      publisher_id: json.publisher_id,
      is_enabled: +json.is_enabled,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log(res);

  return c.json(res);
});

export default app;
