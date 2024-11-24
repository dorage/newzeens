import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { ArticleSchema } from "kysely-schema";

export const zRes = ArticleSchema.shape.id.array();

const route = createRoute({
  path: "",
  tags: [Tag.Sitemap],
  method: "get",
  summary: "article id를 가져옵니다",
  description: "",
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
  const articles = await Ky.selectFrom("articles")
    .select("id")
    .where("is_enabled", "=", 1 as any)
    .execute();

  return c.json(zRes.parse(articles.map((article) => article.id)));
});

export default app;
