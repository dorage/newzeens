import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zRes = z.object({ okay: z.boolean() });

const route = createRoute({
  path: "",
  tags: ["Mock"],
  method: "delete",
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
  await Ky.deleteFrom("keywords").execute();
  await Ky.deleteFrom("keyword_groups").execute();
  await Ky.deleteFrom("publishers").execute();

  return c.json({ okay: true });
});

export default app;
