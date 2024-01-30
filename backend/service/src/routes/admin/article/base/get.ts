import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zQuery = z.object({
  page: z.coerce.number().optional().default(0),
  limit: z.coerce.number().optional().default(10),
  name: z.coerce.string().optional().default(""),
  is_enabled: z.coerce.boolean().optional(),
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

  const keywordGroups = await Ky.selectFrom("articles")
    .selectAll()
    .where((eb) => {
      const conditions = [];
      if (query.name) conditions.push(eb("title", "like", `%${query.name}%`));
      if (query.is_enabled) conditions.push(eb("is_enabled", "=", query.is_enabled));
      return eb.and(conditions);
    })
    .limit(query.limit)
    .offset(query.page * query.limit)
    .orderBy("created_at", "desc")
    .execute();

  return c.json(zRes.parse(keywordGroups));
});

export default app;
