import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import CampaignProvider from "@/src/providers/campaigns";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { CampaignSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zJson = z.object({
  name: CampaignSchema.shape.name.optional(),
  description: CampaignSchema.shape.description,
  comment: CampaignSchema.shape.comment,
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
          example: zJson.parse({
            name: "",
            description: "",
            comment: "",
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

  await Ky.updateTable("campaigns")
    .set({ ...json })
    .where("id", "=", param.id)
    .execute();

  return c.json(zRes.parse(await CampaignProvider.selectCampaigns()));
});

export default app;
