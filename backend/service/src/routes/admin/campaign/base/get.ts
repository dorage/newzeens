import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import CampaignProvider from "@/src/providers/campaigns";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";

export const zRes = OpenAPISchema.AdminCampaign.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "campaign 목록 가져오기",
  description: "",
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
  return c.json(zRes.parse(await CampaignProvider.selectCampaigns()));
});

export default app;
