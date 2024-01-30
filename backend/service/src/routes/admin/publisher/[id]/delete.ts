import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PublisherSchema } from "kysely-schema";

export const zParams = z.object({ id: PublisherSchema.shape.id });

export const zRes = z.object({ okay: z.boolean() });

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "delete",
  summary: "publisher 정보 삭제",
  description: "",
  request: {
    params: zParams,
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
  // security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const params = zParams.parse(c.req.param());

  await Ky.deleteFrom("publishers").where("id", "=", params.id).execute();

  return c.json({ okay: true });
});

export default app;
