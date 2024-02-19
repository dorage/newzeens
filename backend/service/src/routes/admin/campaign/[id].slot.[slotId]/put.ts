import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import SlotProvider from "@/src/providers/slots";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { SlotSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
  slotId: z.coerce.number(),
});

export const zJson = z.object({
  name: SlotSchema.shape.name.optional(),
  description: SlotSchema.shape.description,
  comment: SlotSchema.shape.comment,
  preferences: SlotSchema.shape.preferences,
});

export const zRes = OpenAPISchema.AdminSlot.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "slot 정보 수정하기",
  description: "",
  request: {
    params: zParam,
    body: {
      description: "모든 필드는 옵셔널",
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({
            name: "정치2",
            description: "정치 관련 슬롯입니다2",
            comment: "[관리자 메모] 정치관련 슬롯2",
            preferences: 2,
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

  await Ky.updateTable("slots")
    .set({ ...json })
    .where("id", "=", param.slotId)
    .execute();

  return c.json(zRes.parse(await SlotProvider.selectSlots(param.id)));
});

export default app;
