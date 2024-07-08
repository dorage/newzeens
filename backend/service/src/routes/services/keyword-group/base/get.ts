import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordGroupProvider from "@/src/providers/keyword-groups";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";

export const zRes = OpenAPISchema.AdminKeywordGroup.array();

const route = createRoute({
  path: "",
  tags: [Tag.Keyword],
  method: "get",
  summary: "keyword-group 목록 가져오기",
  description: "",
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
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  return c.json(zRes.parse(await KeywordGroupProvider.selectAll()));
});

export default app;
