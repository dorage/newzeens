import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema, KeywordGroupRelArticleSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
  articleId: z.coerce.string(),
});

export const zJson = z.object({
  preference: KeywordGroupRelArticleSchema.shape.preference,
});

export const zRes = z.object({});

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "",
  description: "",
  request: {
    params: zParam,
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            preference: 99,
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

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const param = zParam.parse(c.req.param());
  const json = zJson.parse(await c.req.json());

  await Ky.updateTable("keyword_group_rel_articles")
    .set({ preference: json.preference })
    .where("keyword_group_rel_id", "=", param.id)
    .where("article_id", "=", param.articleId)
    .execute();

  return c.json({});
});

export default app;
