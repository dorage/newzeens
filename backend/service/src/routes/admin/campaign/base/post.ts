import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import CampaignProvider from "@/src/providers/campaigns";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { CampaignSchema } from "kysely-schema";

export const zJson = z.object({
  name: CampaignSchema.shape.name,
  description: CampaignSchema.shape.description,
  comment: CampaignSchema.shape.comment,
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
      description: "description/comment 는 optional",
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            name: "오늘의 Pick",
            description: "오늘의 Pick 입니다",
            comment: "메인_1",
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

  await Ky.insertInto("campaigns")
    .values({ ...json })
    .execute();

  return c.json(zRes.parse(await CampaignProvider.selectCampaigns()));
});

export default app;
