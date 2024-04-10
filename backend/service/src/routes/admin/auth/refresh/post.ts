import Tag from "@/src/constants/tags";
import Auth from "@/src/libs/auth";
import { useAuth } from "@/src/middlewares/auth";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const zRes = z.object({
	accessToken: z.string().openapi({
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
	}),
});

const route = createRoute({
	path: "",
	tags: [Tag.Admin],
	method: "post",
	summary: "어드민 ID/PWD 로그인",
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
	return c.json({
		accessToken: await Auth.refresh(c),
	});
});

export default app;
