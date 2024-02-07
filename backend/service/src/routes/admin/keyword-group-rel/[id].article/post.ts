import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zJson = z.object({
  article_id: ArticleSchema.shape.id,
});

export const zRes = z.object({});

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "",
  description: "",
  request: {
    params: zParam,
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            article_id: "abcdef",
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
      description: "",
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

  await Ky.insertInto("keyword_group_rel_articles")
    .values({
      keyword_group_rel_id: param.id,
      article_id: json.article_id,
    })
    .execute();

  return c.json({ okay: true });
});

export default app;
