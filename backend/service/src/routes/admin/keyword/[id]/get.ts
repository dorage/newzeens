import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { KeywordSchema } from "kysely-schema";

export const zParams = z.object({
  id: z.coerce.number(),
});

export const zRes = KeywordSchema;

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "keyword의 정보를 가져오기",
  description: "",
  request: {
    params: zParams,
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
  const params = zParams.parse(c.req.param());

  const keyword = await Ky.selectFrom("keywords")
    .selectAll()
    .where("id", "=", params.id)
    .executeTakeFirstOrThrow();

  return c.json(keyword);
});

export default app;
