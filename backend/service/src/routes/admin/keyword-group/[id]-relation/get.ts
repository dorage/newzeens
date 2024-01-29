import Tag from "@/src/constants/tags";
import { selectKeywords } from "@/src/providers/keyword-group-rels";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { KeywordGroupRelSchema, KeywordSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zRes = KeywordSchema.extend({
  preference: KeywordGroupRelSchema.shape.preference,
}).array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "",
  description: "",
  request: {
    params: zParam,
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

  return c.json(zRes.parse(await selectKeywords(param.id)));
});

export default app;
