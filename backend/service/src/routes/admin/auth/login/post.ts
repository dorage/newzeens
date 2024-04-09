import Tag from "@/src/constants/tags";
import Auth from "@/src/libs/auth";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import bcrypt from "bcrypt";
import { HTTPException } from "hono/http-exception";

export const zJson = z.object({
	id: z.string().openapi({ example: "admin" }),
	password: z.string().openapi({ example: "password" }),
});

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
	request: {
		body: {
			content: {
				"application/json": {
					schema: zJson,
				},
			},
			description: "dev 환경에서는 admin/password 로 로그인",
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
			description: "로그인 성공",
		},
	},
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
	const json = zJson.parse(await c.req.json());

	const compare = await bcrypt.compare(json.password, process.env.ADMIN_PWD);
	console.log(compare);
	if (!compare) throw new HTTPException(401, { message: "Invalid ID or password" });

	return c.json({
		accessToken: await Auth.signIn(c),
	});
});

export default app;
