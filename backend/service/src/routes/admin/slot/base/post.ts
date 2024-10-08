import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { SlotSchema } from "kysely-schema";
import { controller } from "./post.controller";

export const zQuery = z.object({
  campaign_id: z.coerce.number(),
});

export const zJson = SlotSchema.pick({
  name: true,
  description: true,
  comment: true,
  preferences: true,
  is_enabled: true,
}).openapi({
  example: {
    name: "정치",
    description: "정치 관련 슬롯입니다",
    comment: "[관리자 메모] 정치관련 슬롯",
    preferences: 1,
    is_enabled: true,
  },
});

export const zRes = OpenAPISchema.AdminSlot.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "campaign에 slot 추가하기",
  description: "",
  request: {
    query: zQuery,
    body: {
      description: "description/comment/preferences 는 옵셔널",
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
      description: "AdminSlot[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const query = zQuery.parse(c.req.query());
  const json = zJson.parse(await c.req.json());

  return c.json(await controller({ query, json }));
});

export default app;
