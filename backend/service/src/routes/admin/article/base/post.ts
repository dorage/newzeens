import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { createUniqueId } from "@/src/libs/nanoid";
import OpenAPISchema from "@/src/openapi/schemas";
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
  url: ArticleSchema.shape.url,
});

export const zRes = OpenAPISchema.AdminArticle;

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "article 추가",
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
      description: "AdminArticle 반환",
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
      url: json.url,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log(res);

  return c.json(res);
});

export default app;
