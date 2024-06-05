import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { CampaignSchema } from "kysely-schema";
import { controller } from "./put.controller";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zJson = CampaignSchema.pick({
  name: true,
  description: true,
  comment: true,
})
  .partial()
  .openapi({
    examples: [
      {
        name: "오늘의 Pick",
        description: "오늘의 Pick 입니다",
        comment: "메인 최상단 위치",
      },
    ],
  });

export const zRes = OpenAPISchema.AdminCampaign.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "campaign 정보 수정",
  description: "",
  request: {
    params: zParam,
    body: {
      description: "모든 필드는 옵셔널",
      content: {
        "application/json": {
          schema: zJson,
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

  return c.json(await controller({ param, json }));
});

export default app;
