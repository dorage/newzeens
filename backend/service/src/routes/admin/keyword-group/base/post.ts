import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordGroupProvider from "@/src/providers/keyword-groups";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";

export const zJson = z.object({
  name: z.string().min(1),
  is_enabled: z.boolean(),
});

export const zRes = OpenAPISchema.AdminKeywordGroup.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "keyword-group 추가",
  description: "",
  request: {
    body: {
      content: {
        "application/json": {
          schema: zJson,
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
      description: "AdminKeywordGroup[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath(), zValidator("json", zJson));

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const json = c.req.valid("json");

  await Ky.insertInto("keyword_groups")
    .values({ name: json.name, is_enabled: +json.is_enabled })
    .execute();

  return c.json(zRes.parse(await KeywordGroupProvider.selectAll()));
});

export default app;
