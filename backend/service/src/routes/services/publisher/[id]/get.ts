import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PublisherSchema } from "kysely-schema";
import { controller } from "./get.controller";

export const zParam = z.object({
  id: PublisherSchema.shape.id,
});

export const zRes = z.object({
  publisher: OpenAPISchema.PublisherDetail,
  recent_articles: OpenAPISchema.ArticlePreview.array(),
  related_publishers: OpenAPISchema.PublisherPreview.array(),
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
  const { id } = zParam.parse(c.req.param());

  const res = await controller({ publisherId: id });

  return c.json(res);
});

export default app;
