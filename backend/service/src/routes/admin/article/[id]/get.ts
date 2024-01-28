import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema } from "kysely-schema";

export const zParams = z.object({
  id: ArticleSchema.shape.id,
});

export const zRes = ArticleSchema;

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "get a detail of a keyword_group",
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
      description: "",
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
