import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { CampaignSchema } from "kysely-schema";
import { controller } from "./post.controller";

export const zJson = CampaignSchema.pick({ name: true, description: true, comment: true }).openapi({
  description: "description/comment 는 optional",
  example: {
    name: "오늘의 Pick",
    description: "오늘의 Pick 입니다",
    comment: "메인 최상단 위치",
  },
});

export const zRes = OpenAPISchema.AdminCampaign.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "campaign 추가",
  description: "",
  request: {
    body: {
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
      description: "AdminCampain[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const json = zJson.parse(await c.req.json());

  return c.json(await controller({ data: json }));
});

export default app;
