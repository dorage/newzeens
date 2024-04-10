import Tag from "@/src/constants/tags";
import { useAuth } from "@/src/middlewares/auth";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zRes = z.object({
	okay: z.boolean().openapi({ example: true, description: "로그인 성공" }),
});

const route = createRoute({
	path: "",
	tags: [Tag.Admin],
	method: "get",
	summary: "로그인 여부 확인",
	description: "",
	responses: {
		200: {
			content: {
				"application/json": {
					schema: zRes,
				},
			},
			description: "로그인 성공",
		},
	},
	security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath(), useAuth());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
	return c.json(zRes.parse({ okay: true }));
});

export default app;
