import Tag from "@/src/constants/tags";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema, PublisherSchema } from "kysely-schema";
import { controller } from "./get.controller";

export const zParam = z.object({ publisherId: PublisherSchema.shape.id });

export const zRes = z.object({
  publisher: PublisherSchema.omit({
    created_at: true,
    is_enabled: true,
  }),
  keywords: z.record(z.string(), z.string()),
  recent_articles: ArticleSchema.pick({
    id: true,
    title: true,
    summary: true,
    thumbnail: true,
    created_at: true,
  })
    .array()
    .length(4),
  related_publishers: PublisherSchema.pick({ id: true, name: true, description: true })
    .extend({ 직무: z.string(), 고유: z.string(), 목적: z.string() })
    .array()
    .length(4),
});

const route = createRoute({
  path: "",
  tags: [Tag.Publisher],
  method: "get",
  summary: "상세페이지에 필요한 모든 정보를 불러옵니다",
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
      description: "publisher정보 반환",
    },
  },
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const { publisherId } = zParam.parse(c.req.param());

  const res = await controller({ publisherId });

  return c.json(res);
});

export default app;
