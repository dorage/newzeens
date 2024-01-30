import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordArticleRelsProvider from "@/src/providers/keyword-article.rels";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema, KeywordGroupRelSchema } from "kysely-schema";

export const zParam = z.object({
  id: ArticleSchema.shape.id,
});

export const zJson = z.object({
  keyword_id: KeywordGroupRelSchema.shape.keyword_id,
  preference: KeywordGroupRelSchema.shape.preference,
});

export const zRes = OpenAPISchema.AdminRelatedKeyword.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "keyword 안에서 article 의 선호도 수정",
  description: "",
  request: {
    body: {
      description: `
      preference 가 null 이면, 랜덤
      preference 숫자가 높을 수록 해당 article 이 배열의 앞에 옴
      preference 는 메인 구좌등에만 적용
      `,
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            keyword_id: 1,
            preference: 2,
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

  await Ky.updateTable("keyword_article_rels")
    .set({ preference: json.preference })
    .where("article_id", "=", param.id)
    .where("keyword_id", "=", json.keyword_id)
    .execute();

  return c.json(zRes.parse(await KeywordArticleRelsProvider.selectKeywords(param.id)));
});

export default app;
