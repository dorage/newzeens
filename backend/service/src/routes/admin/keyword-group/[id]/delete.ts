import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordGroupProvider from "@/src/providers/keyword-groups";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zParam = z.object({ id: z.coerce.number() });

export const zRes = OpenAPISchema.AdminKeywordGroup.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "delete",
  summary: "keyword-group 의 정보를 삭제",
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
  // security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const params = zParam.parse(c.req.param());

  await Ky.deleteFrom("keyword_groups").where("id", "=", params.id).execute();

  return c.json(zRes.parse(await KeywordGroupProvider.selectAll()));
});

export default app;
