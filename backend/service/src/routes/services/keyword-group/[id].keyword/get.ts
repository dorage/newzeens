import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordProvider from "@/src/providers/keywords";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zRes = OpenAPISchema.AdminKeyword.array();

const route = createRoute({
  path: "",
  tags: [Tag.Keyword],
  method: "get",
  summary: "keyword 목록 가져오기",
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
      description: "AdminKeyword[] 반환",
    },
  },
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const param = zParam.parse(c.req.param());

  const keywords = await KeywordProvider.selectAll(param.id);
  if (keywords.some((keyword) => keyword.name.includes("기획자"))) {
    const orderedKeywords = [
      ...keywords.filter((keyword) => keyword.name.includes("기획자")),
      ...keywords.filter((keyword) => !keyword.name.includes("기획자")),
    ];

    return c.json(zRes.parse(orderedKeywords));
  }

  return c.json(zRes.parse(keywords));
});

export default app;
