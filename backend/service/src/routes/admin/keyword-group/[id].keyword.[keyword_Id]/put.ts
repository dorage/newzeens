import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordProvider from "@/src/providers/keywords";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { KeywordSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
  keyword_id: z.coerce.number(),
});

export const zJson = z.object({
  name: KeywordSchema.shape.name.optional(),
  is_enabled: KeywordSchema.shape.is_enabled.optional(),
});

export const zRes = OpenAPISchema.AdminKeyword.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "keyword 의 이름, 활성화 수정",
  description: "",
  request: {
    params: zParam,
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            name: "경제",
            is_enabled: true,
          }),
        },
      },
      description: "모든 필드는 optional",
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
      description: "AdminKeyword[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath(), zValidator("json", zJson));

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const param = zParam.parse(c.req.param());
  const json = zJson.parse(await c.req.json());

  await Ky.updateTable("keywords")
    .set((eb) => {
      const update: any = {};
      if (json.name != null) update.name = json.name;
      if (json.is_enabled != null) update.is_enabled = +json.is_enabled;
      return update;
    })
    .where("id", "=", param.keyword_id)
    .execute();

  return c.json(zRes.parse(await KeywordProvider.selectAll(param.id)));
});

export default app;
