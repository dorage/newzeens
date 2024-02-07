import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { useAuth } from "@/src/middlewares/auth";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zRes = z.object({});

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "",
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
      description: "",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath(), useAuth());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const param = zParam.parse(c.req.param());

  const keywordGroupArticles = await Ky.selectFrom((eb) =>
    eb
      .selectFrom("keyword_group_rel_articles")
      .selectAll()
      .where("keyword_group_rel_articles.keyword_group_rel_id", "=", param.id)
      .as("kgra")
  )
    .leftJoin("articles", "kgra.article_id", "id")
    .selectAll()
    .execute();

  return c.json(keywordGroupArticles);
});

export default app;
