import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import SlotArticleProvider from "@/src/providers/slot-articles";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { ArticleSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
  slotId: z.coerce.number(),
});

export const zJson = z.object({
  article_id: ArticleSchema.shape.id,
});

export const zRes = OpenAPISchema.AdminArticle.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "slot에 article 추가",
  description: "",
  request: {
    params: zParam,
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({ article_id: "asdfgh" }),
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
      description: "AdminArticle[] 반환",
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

  await Ky.deleteFrom("slot_articles")
    .where("slot_id", "=", param.slotId)
    .where("article_id", "=", json.article_id)
    .execute();

  return c.json(zRes.parse(await SlotArticleProvider.selectSlot(param.slotId)));
});

export default app;
