import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PublisherSchema, SlotSchema } from "kysely-schema";
import { controller } from "./put.controller";

export const zParam = z.object({
  id: z.coerce.number(),
});

export const zJson = z
  .object({})
  .passthrough()
  // .record(PublisherSchema.shape.id, z.union([z.number(), z.boolean(), z.null(), z.undefined()]))
  .openapi({
    description: `number는 preferences 와 함께 등록
truthy한 value는 생성
falsy한 value는 삭제`,
    example: { pblsh1: 2, pblsh2: false, pblsh3: true, pblsh4: null },
  });

export const zRes = OpenAPISchema.AdminSlotPublihser.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "put",
  summary: "slot에 publisher 추가/삭제",
  description: "",
  request: {
    params: zParam,
    body: {
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
      description: "AdminSlotPublisher[] 반환",
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
