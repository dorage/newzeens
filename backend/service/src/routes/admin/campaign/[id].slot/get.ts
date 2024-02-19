import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import SlotProvider from "@/src/providers/slots";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zRes = OpenAPISchema.AdminSlot.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "campaign의 slot 목록 가져오기",
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
      description: "AdminSlot[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const param = zParam.parse(c.req.param());

  return c.json(zRes.parse(await SlotProvider.selectSlots(param.id)));
});

export default app;
