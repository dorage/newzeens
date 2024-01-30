import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema } from "kysely-schema";

export const zParams = z.object({
  id: ArticleSchema.shape.id,
});

export const zRes = OpenAPISchema.AdminArticle;

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "article 정보 가져오기",
  description: "",
  request: {
    params: zParams,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: zRes,
        },
      },
      description: "AdminArticle 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const params = zParams.parse(c.req.param());

  const article = await Ky.selectFrom("articles")
    .selectAll()
    .where("id", "=", params.id)
    .executeTakeFirstOrThrow();

  return c.json(article);
});

export default app;
