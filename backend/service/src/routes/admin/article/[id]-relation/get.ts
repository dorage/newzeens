import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordArticleRelsProvider from "@/src/providers/keyword-article.rels";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema } from "kysely-schema";

export const zParam = z.object({
  id: ArticleSchema.shape.id,
});

export const zRes = OpenAPISchema.AdminRelatedKeyword.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "article 의 keyword 가져오기",
  description: "",
  request: {
    params: zParam,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: zRes,
        },
      },
      description: "AdminRelatedKeyword[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const param = zParam.parse(c.req.param());

  return c.json(zRes.parse(await KeywordArticleRelsProvider.selectKeywords(param.id)));
});

export default app;
