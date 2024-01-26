import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";

export const zJson = z.object({
  name: z.string().min(1),
});

export const zRes = z.object({ last_id: z.number() });

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "",
  description: "",
  request: {
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            name: "경제",
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

app.use(route.getRoutingPath(), zValidator("json", zJson));

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const json = c.req.valid("json");

  const res = await Ky.insertInto("keyword_groups")
    .values({ name: json.name })
    .returning("id")
    .executeTakeFirstOrThrow();

  return c.json({ last_id: res.id });
});

export default app;
