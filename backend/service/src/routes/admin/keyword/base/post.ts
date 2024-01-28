import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { KeywordSchema } from "kysely-schema";

export const zJson = z.object({
  name: z.string().min(1),
  is_enabled: z.boolean(),
});

export const zRes = KeywordSchema;

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
            is_enabled: false,
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

  const res = await Ky.insertInto("keywords")
    .values({ name: json.name, is_enabled: +json.is_enabled })
    .returningAll()
    .executeTakeFirstOrThrow();

  return c.json(res);
});

export default app;
