import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { KeywordGroupSchema } from "kysely-schema";

export const zQuery = z.object({
  page: z.coerce.number().optional().default(0),
  limit: z.coerce.number().optional().default(10),
});

export const zRes = z
  .object({
    id: KeywordGroupSchema.shape.id,
    name: KeywordGroupSchema.shape.name,
    created_at: KeywordGroupSchema.shape.created_at.transform((arg) => arg.toString()),
  })
  .array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "",
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
      description: "",
    },
  },
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const query = zQuery.parse(c.req.query());

  const keywordGroups = await Ky.selectFrom("keyword_groups")
    .selectAll()
    .limit(query.limit)
    .offset(query.page * query.limit)
    .orderBy("created_at", "desc")
    .execute();

  return c.json(zRes.parse(keywordGroups));
});

export default app;
