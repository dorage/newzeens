import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema } from "kysely-schema";

export const zParam = z.object({
  id: ArticleSchema.shape.id,
});

export const zJson = z.object({
  keyword_id: z.number(),
});

export const zRes = z.object({ okay: z.boolean() });

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "delete",
  summary: "article 에서 keyword 삭제",
  description: "",
  request: {
    params: zParam,
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({ keyword_id: 1 }),
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

  await Ky.deleteFrom("keyword_article_rels")
    .where("keyword_id", "=", json.keyword_id)
    .where("article_id", "=", param.id)
    .execute();

  return c.json({ okay: true });
});

export default app;
