import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordGroupProvider from "@/src/providers/keyword-groups";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { KeywordGroupSchema } from "kysely-schema";

export const zParams = z.object({
  id: z.coerce.number(),
});

export const zJson = z.object({
  name: KeywordGroupSchema.shape.name.optional(),
  is_enabled: KeywordGroupSchema.shape.is_enabled.optional(),
});

export const zRes = OpenAPISchema.AdminKeywordGroup.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "keyword-group 의 이름, 활성화 수정",
  description: "",
  request: {
    params: zParams,
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
      description: "AdminKeywordGroup[] 반환",
    },
  },
  security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath(), zValidator("json", zJson));

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const params = zParams.parse(c.req.param());
  const json = zJson.parse(await c.req.json());

  await Ky.updateTable("keyword_groups")
    .set((eb) => {
      const update: any = {};
      if (json.name != null) update.name = json.name;
      if (json.is_enabled != null) update.is_enabled = +json.is_enabled;
      return update;
    })
    .where("id", "=", params.id)
    .execute();

  return c.json(zRes.parse(await KeywordGroupProvider.selectAll()));
});

export default app;
