import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordPublisherRelsProvider from "@/src/providers/keyword-publisher-rels";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { KeywordGroupSchema, KeywordSchema, PublisherSchema } from "kysely-schema";

export const zParam = z.object({
  id: PublisherSchema.shape.id,
});

export const zJson = z.object({
  keyword_group_id: KeywordGroupSchema.shape.id,
  keyword_id: KeywordSchema.shape.id.nullable(),
});

export const zRes = OpenAPISchema.AdminRelatedKeyword.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "publisher 에 keyword 가 없으면 추가/있으면 수정/null 은 삭제",
  description: "",
  request: {
    params: zParam,
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            keyword_group_id: 1,
            keyword_id: 1,
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
      description: "AdminRelatedKeyword[] 반환",
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

  if (json.keyword_id === null) {
    await Ky.deleteFrom("keyword_publisher_rels")
      .where("publisher_id", "=", param.id)
      .where("keyword_group_id", "=", json.keyword_group_id)
      .execute();
  } else {
    try {
      await Ky.updateTable("keyword_publisher_rels")
        .set({
          keyword_id: json.keyword_id,
        })
        .where("publisher_id", "=", param.id)
        .where("keyword_group_id", "=", json.keyword_group_id)
        .execute();
    } catch (err) {
      await Ky.insertInto("keyword_publisher_rels")
        .values({
          keyword_id: json.keyword_id,
          keyword_group_id: json.keyword_group_id,
          publisher_id: param.id,
        })
        .execute();
    }
  }

  return c.json(zRes.parse(await KeywordPublisherRelsProvider.selectKeywords(param.id)));
});

export default app;
