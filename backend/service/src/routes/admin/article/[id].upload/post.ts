import Tag from "@/src/constants/tags";
import { uploadObject } from "@/src/libs/s3";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { ArticleSchema } from "kysely-schema";
import moment from "moment";

export const zParam = z.object({
	id: ArticleSchema.shape.id,
});

export const zRes = z.object({
	url: z.string(),
});

const route = createRoute({
	path: "",
	tags: [Tag.Admin],
	method: "post",
	summary: "업로드 article 썸네일",
	description: "",
	request: {
		params: zParam,
	},
	requestBody: {
		content: {
			"multipart/form-data": {
				schema: {
					type: "object",
					properties: {
						file: {
							type: "string",
							format: "binary",
						},
					},
				},
				required: true,
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: zRes,
				},
			},
			description: "url 전달",
		},
	},
	security: [{ Bearer: [] }],
});

const app = new OpenAPIHono();

app.use(route.getRoutingPath());

export type EndpointType = typeof ep;
export const ep = app.openapi(route, async (c) => {
	const { id } = zParam.parse(c.req.param());
	const formData = await c.req.formData();
	const file = formData.get("file") as Blob & { type: string; name: string };
	const buffer = Buffer.from(await file.arrayBuffer());

	const key = ["articles", id, `${Number(moment())}-${file.name}`].join("/");

	try {
		const result = await uploadObject({
			Key: key,
			Body: buffer,
		});
	} catch (err) {
		console.error(err);
		throw new HTTPException(404);
	}

	return c.json(
		zRes.parse({ url: [process.env.R2_PUBLIC_DOMAIN, process.env.R2_BUCKET, key].join("/") })
	);
});

export default app;
