import Tag from "@/src/constants/tags";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { selectScrapInfo } from "./get.model";

export const zQuery = z.object({
  url: z.string(),
});

export const zRes = z.object({ ok: z.boolean() });

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "get",
  summary: "check if url is scrapped",
  description: "",
  request: {
    query: zQuery,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: zRes,
        },
      },
      description: "AdminSlot[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const query = zQuery.parse(c.req.query());

  const scrapInfo = await selectScrapInfo(decodeURI(query.url));

  return c.json({ ok: scrapInfo != null });
});

export default app;
