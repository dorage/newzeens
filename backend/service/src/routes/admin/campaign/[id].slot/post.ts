import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import SlotProvider from "@/src/providers/slots";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { SlotSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zJson = z.object({
  name: SlotSchema.shape.name,
  description: SlotSchema.shape.description,
  comment: SlotSchema.shape.comment,
  preferences: SlotSchema.shape.preferences,
});

export const zRes = OpenAPISchema.AdminSlot.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "post",
  summary: "campaign에 slot 추가하기",
  description: "",
  request: {
    params: zParam,
    body: {
      description: "description/comment/preferences 는 옵셔널",
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            name: "정치",
            description: "정치 관련 슬롯입니다",
            comment: "[관리자 메모] 정치관련 슬롯",
            preferences: 1,
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
      description: "AdminSlot[] 반환",
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

  await Ky.insertInto("slots")
    .values({
      ...json,
      campaign_id: param.id,
    })
    .execute();

  return c.json(zRes.parse(await SlotProvider.selectSlots(param.id)));
});

export default app;
