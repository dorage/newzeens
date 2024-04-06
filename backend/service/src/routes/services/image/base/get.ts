import Tag from "@/src/constants/tags";
import { getObject } from "@/src/libs/s3";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";

const route = createRoute({
	path: "",
	tags: [Tag.Image],
	method: "get",
	summary: "serve remote image",
	description: "",
	responses: {
		200: {
			content: {
				"image/*": {
					schema: { type: "string", format: "binary" },
				},
			},
			description: "image 전달",
		},
	},
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
	const buffer = await getObject(c.req.url);
	const ext = c.req.url.split(".").pop();

	return c.body(buffer, 200, { contentType: `image/${ext}` }) as any;
});

export default app;
