import Tag from "@/src/constants/tags";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zRes = z.object({});

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "",
  description: "",
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
  return c.json({});
});

export default app;
