import Tag from "@/src/constants/tags";
import { queryObject } from "@/src/openapi/query-objects";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema } from "kysely-schema";
import { retreiveArticles } from "./get.query";

export const zQuery = z.object({
  page: queryObject.paginationPage(),
  limit: queryObject.paginationLimit(),
  name: ArticleSchema.shape.title.optional().default("").openapi({
    description: "검색할 제목입니다",
  }),
  publisher_id: ArticleSchema.shape.publisher_id.optional().openapi({
    description: "publisher의 id로 관련 article을 불러옵니다",
  }),
  is_enabled: z.coerce
    .boolean()
    .optional()
    .openapi({ description: "is_enabled 여부에 따라 article을 불러옵니다." }),
});

export const zRes = OpenAPISchema.AdminArticle.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "article 목록 가져오기",
  description: "",
  request: {
    query: zQuery,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: zRes,
        },
      },
      description: "AdminArticle[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const query = zQuery.parse(c.req.query());

  const articles = await retreiveArticles(query);

  return c.json(zRes.parse(articles));
});

export default app;
