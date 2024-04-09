import Tag from "@/src/constants/tags";
import { Ky } from "@/src/libs/kysely";
import OpenAPISchema from "@/src/openapi/schemas";
import KeywordProvider from "@/src/providers/keywords";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zParam = z.object({
	id: z.coerce.number(),
	keyword_id: z.coerce.number(),
});

export const zRes = OpenAPISchema.AdminKeyword.array();

const route = createRoute({
	path: "",
	tags: [Tag.Admin],
	method: "delete",
	summary: "keyword 의 정보를 삭제",
	description: "",
	request: {
		params: zParam,
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

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
	const param = zParam.parse(c.req.param());

	await Ky.deleteFrom("keywords").where("id", "=", param.keyword_id).execute();

	return c.json(zRes.parse(await KeywordProvider.selectAll(param.id)));
});

export default app;
