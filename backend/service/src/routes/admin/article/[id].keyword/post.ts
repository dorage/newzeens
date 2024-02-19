import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordArticleRelsProvider from "@/src/providers/keyword-article-rels";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema, KeywordSchema } from "kysely-schema";

export const zParam = z.object({
  id: ArticleSchema.shape.id,
});

export const zJson = z.object({
  keyword_id: KeywordSchema.shape.id,
});

export const zRes = OpenAPISchema.AdminRelatedKeyword.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "article 에 keyword 추가",
  description: "",
  request: {
    params: zParam,
    body: {
      description: `
        preference는 optional 필드
      `,
      content: {
        "application/json": {
          schema: zJson,
          examples: {
            "without-preference": { value: zJson.parse({ keyword_id: 1 }) },
            "with-preference": { value: zJson.parse({ keyword_id: 1 }) },
          },
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
  const json = zJson.parse(await c.req.json());

  await Ky.insertInto("keyword_article_rels")
    .values({
      keyword_id: json.keyword_id,
      article_id: param.id,
    })
    .execute();

  return c.json(zRes.parse(await KeywordArticleRelsProvider.selectKeywords(param.id)));
});

export default app;