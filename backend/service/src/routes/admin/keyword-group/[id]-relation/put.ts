import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import { selectKeywords } from "@/src/providers/keyword-group-rels";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { KeywordGroupRelSchema, KeywordSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zJson = z.object({
  keyword_id: KeywordGroupRelSchema.shape.keyword_id,
  preference: KeywordGroupRelSchema.shape.preference.nullable(),
});

export const zRes = KeywordSchema.extend({
  preference: KeywordGroupRelSchema.shape.preference,
}).array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "modify a preference of a keyword",
  description: "",
  request: {
    body: {
      description: `
      preference 가 null 이면, 랜덤
      preference 숫자가 높을 수록 해당 키워드가 배열의 앞에 옴
      `,
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            keyword_id: 1,
            preference: 2,
          }),
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
      description: "",
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

  await Ky.updateTable("keyword_group_rels")
    .set({ preference: json.preference })
    .where("keyword_group_id", "=", param.id)
    .where("keyword_id", "=", json.keyword_id)
    .execute();

  return c.json(zRes.parse(await selectKeywords(param.id)));
});

export default app;
