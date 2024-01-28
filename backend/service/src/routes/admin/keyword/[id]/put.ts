import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { KeywordSchema } from "kysely-schema";

export const zParams = z.object({
  id: z.coerce.number(),
});

export const zJson = z.object({
  name: KeywordSchema.shape.name.optional(),
  is_enabled: KeywordSchema.shape.is_enabled.optional(),
});

export const zRes = KeywordSchema;

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "",
  description: "",
  request: {
    params: zParams,
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            name: "경제",
            is_enabled: true,
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
  const params = zParams.parse(c.req.param());
  const json = zJson.parse(await c.req.json());

  const res = await Ky.updateTable("keywords")
    .set((eb) => {
      const update: any = {};
      if (json.name != null) update.name = json.name;
      if (json.is_enabled != null) update.is_enabled = +json.is_enabled;
      return update;
    })
    .where("id", "=", params.id)
    .returningAll()
    .executeTakeFirst();

  return c.json(zRes.parse(res));
});

export default app;
