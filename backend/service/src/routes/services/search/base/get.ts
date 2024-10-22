import Tag from "@/src/constants/tags";
import OpenAPISchema from "@/src/openapi/schemas";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { PublisherSchema } from "kysely-schema";
import { controller } from "./get.controller";

export const zQuery = z.object({
  word: z.string().or(z.string().array()),
});

export const zRes = z
  .object({
    keywords: OpenAPISchema.Keyword.array(),
  })
  .merge(
    PublisherSchema.pick({
      id: true,
      name: true,
      description: true,
      thumbnail: true,
    })
  )
  .array();

const route = createRoute({
  path: "",
  tags: [Tag.Search],
  method: "get",
  summary: "publisher를 검색합니다",
  description: "",
  request: {
    query: zQuery,
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
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
  const { word } = zQuery.parse(c.req.queries());
  let res;
  if (typeof word === "object")
    res = await controller({
      term: word[0],
    });
  else
    res = await controller({
      term: word,
    });

  return c.json(res);
});

export default app;
