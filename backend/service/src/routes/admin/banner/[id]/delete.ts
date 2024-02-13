import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { BannerSchema } from "kysely-schema";

export const zParam = z.object({
  id: BannerSchema.shape.id,
});

export const zRes = z.object({
  okay: z.boolean(),
});

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "delete",
  summary: "",
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

  await Ky.deleteFrom("banners").where("id", "=", param.id).execute();

  return c.json({ okay: true });
});

export default app;
