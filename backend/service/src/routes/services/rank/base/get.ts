import Tag from "@/src/constants/tags";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PublisherSchema } from "kysely-schema";
import { controller } from "./get.controller";
import OpenAPISchema from "@/src/openapi/schemas";

export const zQuery = z.object({
  limit: z.coerce
    .number()
    .max(100)
    .optional()
    .default(20)
    .openapi({ description: "불러올 publisher 개수, 최대 100", maximum: 100 }),
  last_publisher_id: PublisherSchema.shape.id
    .optional()
    .openapi({ description: "가장 마지막 반환된 publisher의 id" }),
});

export const zRes = OpenAPISchema.PublisherRank.array();

const route = createRoute({
  path: "",
  tags: [Tag.Rank],
  method: "get",
  summary: "메인페이지 랭킹정보를 반환",
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
      description: "PublisherRank 전달",
    },
  },
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const { last_publisher_id, limit } = zQuery.parse(c.req.query());

  const res = await controller({
    limit,
    lastPublisherId: last_publisher_id,
  });

  return c.json(res);
});

export default app;
