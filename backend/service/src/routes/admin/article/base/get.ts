import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { queryObject } from "@/src/openapi/query-objects";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema } from "kysely-schema";

export const zQuery = z.object({
  page: queryObject.paginationPage(),
  limit: queryObject.paginationLimit(),
  name: ArticleSchema.shape.title.optional().default("").openapi({
    description: "검색할 제목입니다",
    example: "제목",
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

  // keyword 에 따라
  // keyword + search term에 따라
  // is_enalbed 에 따라
  // page size / limit 에 따라

  const keywordGroups = await Ky.selectFrom("articles")
    .selectAll()
    .where((eb) => {
      const conditions = [];
      if (query.name) conditions.push(eb("title", "like", `%${query.name}%`));
      if (query.is_enabled) conditions.push(eb("is_enabled", "=", query.is_enabled));
      if (query.publisher_id) conditions.push(eb("publisher_id", "=", query.publisher_id));
      return eb.and(conditions);
    })
    .limit(query.limit)
    .offset(query.page * query.limit)
    .orderBy("created_at", "desc")
    .execute();

  return c.json(zRes.parse(keywordGroups));
});

export default app;
