import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema, PublisherSchema } from "kysely-schema";
import { controller } from "./get.controller";

export const zParam = z.object({
  id: ArticleSchema.shape.id,
});

export const zRes = z.object({
  article: z.object({}).merge(
    ArticleSchema.pick({
      title: true,
      summary: true,
      description: true,
      thumbnail: true,
      created_at: true,
      url: true,
    })
  ),
  publisher: z.object({ keywords: OpenAPISchema.Keyword.array() }).merge(
    PublisherSchema.pick({
      id: true,
      name: true,
      description: true,
      url_main: true,
      url_subscribe: true,
      publisher_main: true,
      thumbnail: true,
    })
  ),
  related_articles: z
    .object({
      publisher: PublisherSchema.pick({ id: true, name: true }).extend({
        keywords: OpenAPISchema.Keyword.array(),
      }),
    })
    .merge(ArticleSchema.pick({ title: true, description: true, created_at: true }))
    .array(),
});

const route = createRoute({
  path: "",
  tags: [Tag.Article],
  method: "get",
  summary: "요약페이지에 필요한 모든 정보를 전달합니다",
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
      description: "article 정보 반환",
    },
  },
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const { id } = zParam.parse(c.req.param());

  const res = await controller({ articleId: id });

  return c.json(res);
});

export default app;
