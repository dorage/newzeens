import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import SlotPublisherProvider from "@/src/providers/slot-publishers";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PublisherSchema } from "kysely-schema";

export const zParam = z.object({
  id: z.coerce.number(),
  slotId: z.coerce.number(),
});

export const zJson = z.object({
  publisher_id: PublisherSchema.shape.id,
});

export const zRes = OpenAPISchema.AdminPublisher.array();

const route = createRoute({
  path: "",
  tags: [Tag.Admin],
  method: "delete",
  summary: "slot의 publisher 삭제",
  description: "",
  request: {
    params: zParam,
    body: {
      content: {
        "application/json": {
          schema: zJson,
          example: zJson.parse({ publisher_id: "asdfgh" }),
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
      description: "AdminPublisher[] 반환",
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

  await Ky.deleteFrom("slot_publishers")
    .where("slot_id", "=", param.slotId)
    .where("publisher_id", "=", json.publisher_id)
    .execute();

  return c.json(zRes.parse(await SlotPublisherProvider.selectPublisher(param.slotId)));
});

export default app;
