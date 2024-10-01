import Tag from "@/src/constants/tags";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { insertScrapInfo } from "./post.model";

export const zJson = z.object({
  url: z.string(),
});

export const zRes = z.object({ ok: z.boolean() });

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "add scrapped url into table",
  description: "",
  request: {
    body: { description: "", content: { "application/json": { schema: zJson } }, required: true },
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
  const json = zJson.parse(await c.req.json());

  await insertScrapInfo(json.url);

  return c.json({ ok: true });
});

export default app;
