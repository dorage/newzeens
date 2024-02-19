import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import CampaignProvider from "@/src/providers/campaigns";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zRes = OpenAPISchema.AdminCampaign.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "delete",
  summary: "campaign 정보 삭제",
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

  await Ky.deleteFrom("campaigns").where("id", "=", param.id).execute();

  return c.json(zRes.parse(await CampaignProvider.selectCampaigns()));
});

export default app;
