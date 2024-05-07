import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema, CampaignSchema, PublisherSchema, SlotSchema } from "kysely-schema";
import { controller } from "./get.controller";

const zParam = z.object({
  id: z.coerce.number(),
});

export const zQuery = z.object({
  limit: z.coerce
    .number()
    .optional()
    .default(4)
    .openapi({ description: "length of article in each slot" }),
});

export const zRes = z.object({
  name: CampaignSchema.shape.name,
  slots: z
    .object({
      articles: z
        .object({
          publisher: z
            .object({ keywords: OpenAPISchema.Keyword.array() })
            .merge(PublisherSchema.pick({ id: true, name: true })),
        })
        .merge(
          ArticleSchema.pick({
            id: true,
            title: true,
            thumbnail: true,
            created_at: true,
          })
        )
        .array(),
    })
    .merge(SlotSchema.pick({ name: true }))
    .array(),
});

const route = createRoute({
  path: "",
  tags: [Tag.Campaign],
  method: "get",
  summary: "Campaign 의 Aritcle정보를 가져옵니다",
  description: "",
  request: {
    params: zParam,
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
  const { id } = zParam.parse(c.req.param());
  const { limit } = zQuery.parse(c.req.queries());

  const res = await controller({
    campaignId: id,
    limit: limit,
  });

  return c.json(res);
});

export default app;
