import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { ArticleSchema } from "kysely-schema";
import moment from "moment";

export const zParams = z.object({
  id: ArticleSchema.shape.id,
});

export const zJson = z.object({
  thumbnail: ArticleSchema.shape.thumbnail.optional(),
  title: ArticleSchema.shape.title.optional(),
  summary: ArticleSchema.shape.summary.optional(),
  publisher_id: ArticleSchema.shape.publisher_id.optional(),
  is_enabled: ArticleSchema.shape.is_enabled.optional(),
});

export const zRes = OpenAPISchema.AdminArticle;

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "article 정보 수정",
  description: "",
  request: {
    params: zParams,
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
      description: "AdminArticle 반환",
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

  const res = await Ky.updateTable("articles")
    .set((eb) => {
      const update: any = {};
      if (json.thumbnail != null) update.thumbnail = json.thumbnail;
      if (json.title != null) update.title = json.title;
      if (json.summary != null) update.summary = json.summary;
      if (json.publisher_id != null) update.publisher_id = json.publisher_id;
      if (json.is_enabled != null) update.is_enabled = +json.is_enabled;
      return update;
    })
    .where("id", "=", params.id)
    .returningAll()
    .executeTakeFirst();

  return c.json(ArticleSchema.parse(res));
});

export default app;
