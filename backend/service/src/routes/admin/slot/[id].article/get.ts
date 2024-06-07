import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { SlotSchema } from "kysely-schema";
import { controller } from "./get.controller";

export const zParam = z.object({
  id: z.string().transform((v) => SlotSchema.shape.id.parse(v)),
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

  return c.json(await controller({ param }));
});

export default app;
