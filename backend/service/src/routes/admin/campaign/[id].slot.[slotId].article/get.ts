import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import SlotArticleProvider from "@/src/providers/slot-articles";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zParam = z.object({
  id: z.coerce.number(),
  slotId: z.coerce.number(),
});

export const zRes = OpenAPISchema.AdminArticle.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "slot의 article 목록 가져오기",
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
      description: "AdminArticle[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const param = zParam.parse(c.req.param());

  return c.json(zRes.parse(await SlotArticleProvider.selectSlot(param.slotId)));
});

export default app;
