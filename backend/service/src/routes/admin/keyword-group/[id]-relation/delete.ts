import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { selectKeywords } from "@/src/providers/keyword-group-rels";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { KeywordGroupRelSchema, KeywordSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zJson = z.object({
  keyword_id: z.number(),
});

export const zRes = KeywordSchema.extend({
  preference: KeywordGroupRelSchema.shape.preference,
}).array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "delete",
  summary: "",
  description: "",
  request: {
    params: zParam,
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({ keyword_id: 1 }),
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

  await Ky.deleteFrom("keyword_group_rels")
    .where("keyword_id", "=", json.keyword_id)
    .where("keyword_group_id", "=", param.id)
    .execute();

  return c.json(zRes.parse(await selectKeywords(param.id)));
});

export default app;
