import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { BannerSchema } from "kysely-schema";

export const zParam = z.object({
  id: BannerSchema.shape.id,
});

export const zJson = z.object({
  url: BannerSchema.shape.url.optional(),
  is_enabled: BannerSchema.shape.is_enabled.optional(),
});

export const zRes = z.object({ okay: z.boolean() });

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "",
  description: "",
  request: {
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            url: "http://good.com",
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

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const param = zParam.parse(c.req.param());
  const json = zJson.parse(await c.req.json());

  await Ky.updateTable("banners")
    .set((eb) => {
      const updates: z.infer<typeof zJson> = {};
      if (json.is_enabled) updates.is_enabled = json.is_enabled;
      if (json.url) updates.url = json.url;
      return updates;
    })
    .where("banners.id", "=", param.id)
    .execute();

  return c.json({ okay: true });
});

export default app;
