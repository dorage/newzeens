import Tag from "@/src/constants/tags";
import { getObject, listObjects } from "@/src/libs/s3";
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
			description: "AdminArticle 반환",
		},
	},
	security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
	const key = c.req.url.replace(`${process.env.ORIGIN_IMAGE}/${process.env.R2_BUCKET}/`, "");

	console.log("key", key);

	const buffer = await getObject(key);
	const ext = c.req.url.split(".").pop();

	return c.body(buffer, 200, { contentType: `image/${ext}` });
});

export default app;
