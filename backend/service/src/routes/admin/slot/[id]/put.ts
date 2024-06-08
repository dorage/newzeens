import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { SlotSchema } from "kysely-schema";
import { controller } from "./put.controller";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zJson = SlotSchema.pick({
  name: true,
  description: true,
  comment: true,
  preferences: true,
})
  .partial()
  .openapi({
    example: {
      name: "정치2",
      description: "정치 관련 슬롯입니다2",
      comment: "[관리자 메모] 정치관련 슬롯2",
      preferences: 2,
    },
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

  return c.json(await controller({ param, json }));
});

export default app;
