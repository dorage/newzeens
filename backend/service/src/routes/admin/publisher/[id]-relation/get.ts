import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordPublisherRelsProvider from "@/src/providers/keyword-publisher-rels";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PublisherSchema } from "kysely-schema";

export const zParam = z.object({
  id: PublisherSchema.shape.id,
});

export const zRes = OpenAPISchema.AdminRelatedKeyword.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "publisher 의 keyword 가져오기",
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
      description: "AdminRelatedKeyword[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const param = zParam.parse(c.req.param());

  return c.json(zRes.parse(await KeywordPublisherRelsProvider.selectKeywords(param.id)));
});

export default app;
