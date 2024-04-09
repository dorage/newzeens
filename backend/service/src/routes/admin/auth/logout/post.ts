import Tag from "@/src/constants/tags";
import Auth from "@/src/libs/auth";
import { useAuth } from "@/src/middlewares/auth";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zRes = z.object({
	okay: z.boolean().openapi({ example: true }),
});

const route = createRoute({
	path: "",
	tags: [Tag.Admin],
	method: "post",
	summary: "어드민 로그아웃",
	description: "",
	responses: {
		200: {
			content: {
				"application/json": {
					schema: zRes,
				},
			},
			description: "로그아웃 여부",
		},
	},
	security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath(), useAuth());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
	await Auth.signOut(c);
	return c.json({ okay: true });
});

export default app;
