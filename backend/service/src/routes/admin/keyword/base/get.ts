import { useAuth } from "@/src/middlewares/auth";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zRes = z.object({});

const route = createRoute({
  path: "",
  tags: [""],
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

app.use(route.getRoutingPath(), useAuth());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  return c.json(zRes.parse({}));
});

export default app;
